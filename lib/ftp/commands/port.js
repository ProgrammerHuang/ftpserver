import when from 'when';
import {Socket} from 'net';

export default function (thisCmd, info) {
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

    return this.dataSocket.connect({
      host: ip,
      port
    });
  })
  .then(() => {
    return this.reply(200);
  });
}
