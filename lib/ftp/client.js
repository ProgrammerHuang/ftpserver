import when from 'when';
import _ from 'lodash';
import EventEmitter from 'eventemitter3';

import messages from './messages';
import commands from './commands';

export default class Client extends EventEmitter {
  constructor(socket) {
    super();

    this.previousCommand = null;

    this._socket = socket;
    this._socket.setTimeout(0);
    this._socket.setNoDelay();

    this._socket.on('connect', () => {
      this.emit('connect');
      console.log('socket connect');
    });

    this._socket.on('data', (data) => {
      const parts = _.trim(data.toString('utf-8')).split(' ');
      const command = parts[0].toLocaleUpperCase();
      const args = parts.slice(1, parts.length);

      console.log('socket command', command, args);

      if (commands.hasOwnProperty(command)) {
        commands[command].apply(this, args);
      } else {
        this.reply(502);
      }
      this.previousCommand = command;
    });

    this._socket.on('error', (error) => {
      this.emit('error', error);
      console.log('socket error', error);
    });
  }

  write(message) {
    return new Promise((resolve, reject) => {
      if (this._socket.writable) {
        this._socket.write(message + '\r\n', 'utf-8', resolve);
      } else {
        reject(new Error('Socket not writable'));
      }
    });
  }

  reply(status, message = null) {
    if (!message) message = messages[status] || 'No information.';

    return this.write(status + ' ' + message + '\r\n', 'utf-8');
  }
}
