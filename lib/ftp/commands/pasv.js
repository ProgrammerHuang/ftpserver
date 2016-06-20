import net from 'net';

export default function () {
  this._mode = 'PASV';

  function pasvError(err) {
    console.log('PASV error', err);
    this.respond(421);
    this.pasvServer = null;
    this.dataSocket = null;
  }

  function sendConfirmation(port) {
    const host = this.serverAddress.address.split('.').join(',');

    const portI1 = port / 256 | 0;
    const portI2 = port % 256;

    this._socket.pause();
    return this.reply('227', 'PASV OK (' + [host, portI1, portI2].join(',') + ')');
  }

  let pasvPort = this.pasvStart;
  let pasv = net.createServer();
  pasv.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE' && pasvPort < this.pasvEnd) {
      pasv.listen(++pasvPort);
    } else {
      pasvError.call(this, err);
    }
  })
  .on('listening', () => {
    pasv.removeAllListeners('error');
    pasv.on('error', pasvError);

    sendConfirmation.call(this, pasvPort);
  })
  .on('connection', (socket) => {
    this.dataSocket = socket;
    this._socket.resume();
  })
  .on('close', () => {
    this.pasvServer = null;
    this.dataSocket = null;
  })
  .listen(pasvPort);
}
