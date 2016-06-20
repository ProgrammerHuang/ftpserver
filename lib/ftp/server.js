import net from 'net';
import EventEmitter from 'eventemitter3';

import Client from './client';

export default class Server extends EventEmitter {
  constructor({host, port, pasvStart, pasvEnd} = {}) {
    super();

    this.host = host;
    this.port = port;
    this.pasvStart = pasvStart;
    this.pasvEnd = pasvEnd;

    this._server = net.createServer();

    this._server.on('error', (err) => {
      this.emit('error', err);
      console.log('server error', err);
    });

    this._server.on('connection', (socket) => {
      let client = new Client(socket);
      client.pasvStart = this.pasvStart;
      client.pasvEnd = this.pasvEnd;
      client.serverAddress = this.address;
      this.emit('connection', client);
      client.reply(220);
    });

    this._server.on('close', () => {
      this.emit('close');
      console.log('server close');
    });
  }

  listen() {
    return new Promise((resolve) => {
      this._server.listen({
        port: this.port,
        host: this.host
      }, () => {
        this.address = this._server.address();
        console.log('Listening', this.address.address, this.address.port);
        resolve(this.address);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.database.close();
      this._server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
