import when from 'when';
import {Socket} from 'net';

export default function (info) {
  return when.try(() => {
    info = info.split(',');
    if (info.length !== 6) return this.reply(425);

    let ip = info.slice(0, 4).join('.');
    let port = info.slice(4).map(p => parseInt(p));
    port = port[0] * 256 + port[1];

    return {ip, port};
  })
  .then(({ip, port}) => {
    this.dataSocket = new Socket();
    this.dataSocket.setEncoding(this.server.dataEncoding);
    this.dataSocket.once('connect', () => this.dataSocketConnected = true);
    this.dataSocket.once('close', () => this.dataSocketConnected = false);

    return this.dataSocket.connect({
      host: ip,
      port
    });
  })
  .then(() => {
    return this.reply(200);
  });
}
