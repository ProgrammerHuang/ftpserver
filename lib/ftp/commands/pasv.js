import net from 'net';

export default function () {
  this._mode = 'PASV';

  function pasvError(err) {
    console.log('PASV error', err);
    this.respond(421);
    this.pasvServer = null;
    this.dataSocket = null;
  }

  let pasvPort = process.env.FTP_PASV_PORT_START;
  let pasv = net.createServer();
  pasv.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE' && pasvPort < process.env.FTP_PASV_PORT_END) {
      pasv.listen(++pasvPort);
    } else {
      pasvError.call(this, err);
    }
  })
  .on('listening', () => {
    this.pasvServer = pasv;
    this.pasvServer.removeAllListeners('error');
    this.pasvServer.on('error', pasvError);

    const host = this.serverAddress.address.split('.').join(',');
    const port = parseInt(this.pasvServer.address().port);

    const portI1 = port / 256 | 0;
    const portI2 = port % 256;

    this._socket.pause();
    this.reply('227', 'PASV OK (' + [host, portI1, portI2].join(',') + ')');
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
