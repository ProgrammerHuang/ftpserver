import net from 'net';
import EventEmitter from 'eventemitter3';
import when from 'when';
import sequence from 'when/sequence';
import whenNode from 'when/node';
var fs = whenNode.liftAll(require('fs'));

import Client from './client';

// TODO: RFC 1123 complicance

export default class Server extends EventEmitter {
  constructor({host, port, pasvStart = null, pasvEnd = null, anonymous = false, greeting = null} = {}) {
    super();
    this.host = host;
    this.port = port;
    this.pasvStart = pasvStart;
    this.pasvEnd = pasvEnd;
    this.anonymous = anonymous;
    this.greeting = greeting;

    this._server = net.createServer();

    this._server.on('error', (err) => {
      this.emit('error', err);
      console.log('server error', err);
    });

    this._server.on('connection', (socket) => {
      console.log('connection')
      let client = new Client(socket);
      client.server = this;
      this.emit('connection', client);

      return when.try(() => {
        if (this.greeting && this.greeting.length) {
          return sequence(this.greeting.forEach(line => client.reply.bind(this, 220, line, null, false)));
        }
      })
      .then(() => {
        let features = ['Features:'];

        if (this.anonymous) {
          features.push('a');
        }

        if (features.length - 1) {
          features.push('.');
        } else {
          features = [];
        }

        return client.reply(220, features.length ? features.join(' ') : 'Ready'); // 421 to reject
      });
    });

    this._server.on('close', () => {
      this.emit('close');
      console.log('server close');
    });
  }

  loadGreeting(greeting) {
    return fs.stat(greeting)
    .then((stat) => stat.isDirectory() ? when.resolve() : when.reject())
    .then(() => fs.readFile(greeting, {encoding: 'utf8'}))
    .then((fileContents) => {
      return fileContents;
    })
    .catch(ReferenceError, () => null)
    .catch(TypeError, () => null)
    .catch(err => {
      console.log('greeting err', err, typeof err)
      switch (err.code) {
        case 'ENOENT': return greeting;
        default: throw err;
      }
    })
    .then(greet => greet ? greet.match(/$(.*)^/mgi) : null);
  }

  listen() {
    return this.loadGreeting(this.greeting)
    .then((greeting) => {
      this.greeting = greeting;
      this._server.listen({
        port: this.port,
        host: this.host
      }, () => {
        this.address = this._server.address();
        console.log('Listening', this.address.address, this.address.port);
        return this.address;
      });
    })
    .catch(err => {
      console.log('Unable to set greeting using: ' + greeting, err);
      this.greeting = null;
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
