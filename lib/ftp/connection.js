import moment from 'moment';

import FileSystem from './file-system';
import messages from './messages';
import commands from './commands';

const NO_AUTH_CMDS = [
  'USER',
  'PASS',
  'ACCT',
  'QUIT',
  'FEAT',
  'SYST',
  'NOOP'
];

export default class Connection {
  constructor(socket) {
    this._socket = socket;
    this._socket.setTimeout(0);
    this._socket.setNoDelay();

    this.fs = new FileSystem();
    this.currentCommand = null;
    this.previousCommand = null;
    this.root = '/';
    this.lastCommand = moment.utc();
    this.dataSocket = null;

    this._socket.on('data', (data) => {
      let parts = data.toString('utf-8').trim().split(' ');
      parts[0] = parts[0].toLocaleUpperCase();
      const [command, ...args] = parts;

      this.bunyan.info({command, parameter: args});

      if (~this.server.options.disabledCommands.indexOf(command)) {
        this.reply(502, 'Command not allowed.');
        return;
      }

      if (!this.server.options.anonymous && !this.authenticated && !~NO_AUTH_CMDS.indexOf(command)) {
        this.reply(550, 'Command requires authentication.');
        return;
      }

      this.lastCommand = moment.utc();
      this.currentCommand = command;
      if (commands.hasOwnProperty(command)) {
        commands[command].apply(this, args);
      } else {
        this.reply(502);
      }
      this.previousCommand = command;

      setTimeout(() => {
        if (moment.utc() > this.lastCommand.add(this.server.options.timeout, 'ms')) {
          this.close();
        }
      }, this.server.options.timeout);
    })
    .on('close', () => {
      this.bunyan.info('Closing connection.');
      if (this.dataSocket) {
        this.dataSocket.end();
      }
    })
    .on('error', (err) => {
      this.bunyan.error(err);
    });
  }

  write(message, socket = null) {
    socket = socket || this._socket;
    return new Promise((resolve, reject) => {
      if (socket && socket.writable) {
        //this.bunyan.info({write: message});
        socket.write(message + '\r\n', 'utf-8', resolve);
      } else {
        reject(new Error('Socket not writable'));
      }
    });
  }

  reply(status, message = null, socket = null, eol = true) {
    if (!message) message = messages[status] || 'No information.';

    return this.write(status + (eol ? ' ' : '-') + message, socket);
  }

  close(code = 421) {
    return this.reply(code, 'Closing connection.')
    .then(() => this._socket.end());
  }
}
