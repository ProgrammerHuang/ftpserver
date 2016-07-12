import net from 'net';

export default function () {
  function pasvError(err, code = 421) {
    this.bunyan.error(err, {command: 'PASV'});
    this.dataSocket = null;
    return this.reply(code);
  }

  if (!this.server.pasvStart || !this.server.pasvEnd) {
    return pasvError(new Error('Passive port range not set.'));
  }

  function sendConfirmation(port) {
    const host = this.server.host.split('.').join(',');

    const portI1 = port / 256 | 0;
    const portI2 = port % 256;

    this._socket.pause();
    return this.reply(227, 'PASV OK (' + [host, portI1, portI2].join(',') + ')');
  }

  if (this.dataSocket) {
    this.dataSocket.end();
  }

  let pasvPort = this.server.pasvStart;
  let pasv = net.createServer();
  pasv.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE' && pasvPort < this.server.pasvEnd) {
      pasv.listen(++pasvPort);
    } else {
      pasvError.call(this, err);
    }
  })
  .on('listening', () => {
    pasv.removeAllListeners('error');
    pasv.on('error', err => pasvError.call(this, err));

    sendConfirmation.call(this, pasv.address().port);
  })
  .on('connection', (socket) => {
    if (this._socket.remoteAddress !== socket.remoteAddress) {
      socket.destroy();
      return pasvError.call(this, new Error('Addresses do not match.'), 550)
      .then(() => this.close());
    }
    this.dataSocket = socket;
    this.dataSocket.setEncoding(this.server.dataEncoding);
    this.dataSocketConnected = true;

    this.dataSocket.on('data', () => {
      this.commandQueue.disable();
    });
    this.dataSocket.on('close', () => {
      this.commandQueue.enable();
      this.dataSocketConnected = false;
    });
    this.dataSocket.on('error', (err) => {
      // todo: resume
      switch (err.code) {
        case 'ECONNRESET': break;
      }
    });

    this._socket.resume();
  })
  .on('close', () => {
    this.dataSocket = null;
    this.dataSocketConnected = false;
    this.commandQueue.enable();
  })
  .listen(pasvPort);
}
