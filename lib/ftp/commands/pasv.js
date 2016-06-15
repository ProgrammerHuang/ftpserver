import net from 'net';

export default function () {
  this.pasvServer = net.createServer();
  this.pasvServer.on('connection', (socket) => {
    socket.setEncoding(this.dataEncoding);
    socket.on('connect', () => {
      console.log('pasv connect')
    })
    .on('close', () => {
      this.reply(226);
      this.pasvServer.close();
    })
    .on('error', (err) => {
      this.error = err;
      this.reply(err.code || 500, err.message || 'No error message defined.');
    });
  })
  .on('listening', () => {
    let host = this.pasvServer.address().address;
    let port = this.pasvServer.address().port;
    this.reply(227, 'PASV OK (' + [host.split('.').join(','), parseInt(port / 256, 10), port % 256].join(',') + ')');
  })
  .listen();
}
