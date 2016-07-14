import moment from 'moment';
import when from 'when';

import WorkerQueue from '../../worker-queue';
import FileSystem from '../file-system';
import messages from '../messages';
import commands from '../commands';

const NO_AUTH_CMDS = [
  'USER',
  'PASS',
  'ACCT',
  'QUIT',
  'FEAT',
  'SYST',
  'NOOP',
  'HELP'
];

export default class Connection {
  constructor(socket) {
    this._socket = socket;
    this._socket.setTimeout(0);
    this._socket.setNoDelay();

    this.fs = new FileSystem();
    this.root = '/';
    this.lastCommand = moment.utc();

    this.dataEncoding = 'utf8';
    this.dataServer = null;
    this.dataSocket = null;
    this.dataSocketConnected = false;

    this.commandQueue = new WorkerQueue();
    this.commandQueue.active = true;

    this._socket.on('data', (buffer) => {
      buffer = buffer.toString('utf-8').split('\r\n').filter((b) => !!b);
      buffer.map((data) => {
        let parts = data.split(' ');
        parts[0] = parts[0].toLocaleUpperCase();
        const [cmd, ...args] = parts;

        this.bunyan.debug('Command', {cmd, parameter: args});

        this.lastCommand = moment.utc();

        let enqueue = true;
        if (commands.hasOwnProperty(cmd)) {
          let command = commands[cmd];
          enqueue = command.enqueue;
        }

        if (enqueue) {
          this.commandQueue.push(cmd, this.handleCommand.bind(this, cmd, args));
        } else {
          this.handleCommand(cmd, args);
        }
      });
    })
    .on('close', () => {
      this.bunyan.info('Closing connection.');
      if (this.dataSocket) {
        this.dataSocket.end();
      }
    })
    .on('timeout', () => {
      this.bunyan.info('Timeout connection.');
      this._socket.emit('close');
    })
    .on('error', (err) => {
      this.bunyan.error(err);
    });
  }

  get previousCommand() {
    return this.commandQueue.previous;
  }

  get currentCommand() {
    return this.commandQueue.current;
  }

  handleCommand(cmd, args) {
    return when.try(() => {
      if (~this.server.options.disabledCommands.indexOf(cmd)) {
        return this.reply(502, 'Command not allowed.');
      }

      if (!this.server.options.anonymous && !this.authenticated && !~NO_AUTH_CMDS.indexOf(cmd)) {
        return this.reply(530, 'Command requires authentication.');
      }

      if (commands.hasOwnProperty(cmd)) {
        return commands[cmd].fn.apply(this, [cmd].concat(args));
      } else {
        return this.reply(502);
      }
    });
  }

  waitForDataSocket() {
    let defer = when.defer();
    if (this.dataSocket && this.dataSocketConnected) {
      defer.resolve();
    } else {
      if (this.pasv) this.pasv.once('connection', () => defer.resolve());
      else {
        // TODO: active connection
        defer.reject();
      }
    }
    return defer.promise;
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
