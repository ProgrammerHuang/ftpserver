import net from 'net';
import EventEmitter from 'eventemitter3';
import when from 'when';
import bunyan from 'bunyan';
import sequence from 'when/sequence';
import whenNode from 'when/node';
var fs = whenNode.liftAll(require('fs'));

import Connection from './connection';

// TODO: RFC 1123 complicance

export default class Server extends EventEmitter {
  constructor({host, port,
    pasvStart = null,
    pasvEnd = null,
    anonymous = false,
    greeting = null,
    disabledCommands = [],
    requireAccount = false
  } = {}) {
    super();
    this.host = host;
    this.port = port;
    this.pasvStart = pasvStart;
    this.pasvEnd = pasvEnd;

    this.options = {
      greeting,
      anonymous,
      disabledCommands: disabledCommands.map(c => c.toLocaleUpperCase()),
      requireAccount
    };

    this.bunyan = bunyan.createLogger({name: 'FTP Server'});
    this._server = net.createServer();

    this._server.on('error', (err) => {
      this.emit('error', err);
      err.sender = 'server event';
      this.bunyan.error(err);
    });

    this._server.on('connection', (socket) => {
      let connection = new Connection(socket);
      connection.server = this;
      this.emit('connection', connection);

      return when.try(() => {
        if (this.options.greeting && this.options.greeting.length) {
          return sequence(this.options.greeting.forEach(line => connection.reply.bind(this, 220, line, null, false)));
        }
      })
      .then(() => {
        let features = ['Features:'];

        if (this.options.anonymous) {
          features.push('a');
        }

        if (features.length - 1) {
          features.push('.');
        } else {
          features = [];
        }

        return connection.reply(220, features.length ? features.join(' ') : 'Ready'); // 421 to reject
      });
    });

    this._server.on('close', () => {
      this.emit('close');
    });
  }

  loadGreeting(greeting) {
    return fs.stat(greeting)
    .then((stat) => stat.isDirectory() ? when.resolve() : when.reject())
    .then(() => fs.readFile(greeting, {encoding: 'utf8'}))
    .catch(ReferenceError, () => null)
    .catch(TypeError, () => null)
    .catch(err => {
      err.sender = 'loadGreeting';
      this.bunyan.error(err);
      switch (err.code) {
        case 'ENOENT': return greeting;
        default: throw err;
      }
    })
    .then(greet => greet ? greet.match(/$(.*)^/mgi) : null)
    .then((greeting) => this.options.greeting = greeting);
  }

  listen() {
    return this.loadGreeting(this.options.greeting)
    .then(() => {
      this._server.listen({
        port: this.port,
        host: this.host
      }, () => {
        this.address = this._server.address();
        this.bunyan.info('Listening', {address: this.address.address, port: this.address.port});
        return this.address;
      });
    })
    .catch(err => {
      err.sender = 'listen';
      this.bunyan.error(err);
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
