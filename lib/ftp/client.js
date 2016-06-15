import when from 'when';
import _ from 'lodash';

import messages from './messages';
import commands from './commands';

export default class Client {
  constructor(socket) {
    this._socket = socket;
    this._socket.setTimeout(0);
    this._socket.setNoDelay();

    this._mode = 'PORT';

    this.previousCommand = null;
    this.serverAddress = null;
    this.cwd = '/';

    this.dataSocket = null;
    this.pasvServer = null;

    this._socket.on('data', (data) => {
      const parts = _.trim(data.toString('utf-8')).split(' ');
      const command = parts[0].toLocaleUpperCase();
      const args = parts.slice(1, parts.length);

      console.log('command', command, args);

      if (commands.hasOwnProperty(command)) {
        commands[command].apply(this, args);
      } else {
        this.reply(502);
      }
      this.previousCommand = command;
    })
    .on('close', () => {
      console.log('client close');
      if (this.dataSocket) {
        this.dataSocket.close();
      }
    })
    .on('error', (error) => {
      console.log('client error', error);
    });
  }

  isPassiveMode() {
    return this._mode === 'PASV';
  }

  write(message, socket) {
    socket = socket || this._socket;
    return new Promise((resolve, reject) => {
      if (socket.writable) {
        socket.write(message + '\r\n', 'utf-8', resolve);
      } else {
        reject(new Error('Socket not writable'));
      }
    });
  }

  reply(status, message = null, socket) {
    if (!message) message = messages[status] || 'No information.';

    return this.write(status + ' ' + message, socket);
  }
}
