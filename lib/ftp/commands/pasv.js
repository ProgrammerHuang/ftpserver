import PassiveConnection from '../connection/passive';

export default function () {
  if (!this.dataServer) {
    this.dataServer = new PassiveConnection(this, {
      pasvStart: this.server.pasvStart,
      pasvEnd: this.server.pasvEnd
    });
  }

  return this.dataServer.create()
  .then(() => {
    const host = this.server.host.split('.').join(',');
    const port = this.dataServer.port;

    const portI1 = port / 256 | 0;
    const portI2 = port % 256;

    return this.reply(227, 'PASV OK (' + [host, portI1, portI2].join(',') + ')');
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'PASV'});
    this.reply(550);
  });
}
