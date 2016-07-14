import net from 'net';
import when from 'when';
import EventEmitter from 'events';

class PassiveConnection extends EventEmitter {
  constructor(session, {pasvStart, pasvEnd}) {
    super();
    this.session = session;
    this.pasvStart = pasvStart;
    this.pasvEnd = pasvEnd;
    this.server = null;
    this.socket = null;
  }

  get port() {
    if (!this.server) return null;
    return this.server.address().port;
  }

  create() {
    if (this.server) {
      if (this.socket) this.socket.end();
      return when.resolve();
    }

    let pasv = net.createServer();
    return when.try(() => {
      if (!this.pasvStart || !this.pasvEnd) {
        return new Error('Passive port range not set.');
      }
    })
    .then(() => when.iterate(
      ([port]) => {
        return when.promise((resolve, reject) => {
          pasv.once('error', (err) => {
            if (!err.code) reject(err);
            else {
              if (err.code === 'EADDRINUSE') resolve([++port, err.code]);
              else reject(err);
            }
          });
          pasv.once('listening', () => resolve([port, 'SUCCESS']));
          pasv.listen(port);
        });
      },
      ([port, code]) => {
        if (code === 'SUCCESS') return when.resolve(true);
        if (port > this.pasvEnd) return when.reject(new Error('End of passive port range.'));
      },
      ([port]) => this.session.bunyan.trace('Try passive listen on port', port),
      [this.pasvStart, null]
    ))
    .then(([port]) => {
      pasv.removeAllListeners('error');
      this.server = pasv;
      this.server.on('error', this._onError.bind(this));
      this.server.on('connection', this._onConnection.bind(this));
      this.server.on('close', this._onClose.bind(this));
      this.server.on('end', this._onClose.bind(this));
      this.session.bunyan.info('Passive connection listening', {port});
    })
    .catch((err) => {
      this.session.bunyan.error('Passive connection failed', err);
      throw err;
    });
  }

  onReady() {
    var defer = when.defer();
    if (this.socket) {
      defer.resolve(this.socket);
    } else {
      this.once('ready', () => {
        defer.resolve(this.socket);
      });
    }
    return defer.promise;
  }

  write(data) {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.writable) {
        this.socket.write(data + '\r\n', 'utf-8', resolve);
      } else {
        reject(new Error('Socket not writable'));
      }
    });
  }

  end() {
    if (this.socket) {
      this.socket.end();
      this.socket = null;
    }
  }

  _onError(err) {
    this.session.bunyan.error('Server error', err);
    this.emit('error', err);
  }

  _onConnection(socket) {
    this.socket = socket;
    this.socket.setEncoding(this.session.dataEncoding);
    this.socket.pause();
    this.emit('ready');
  }

  _onClose() {
    this.session.bunyan.error('Passive connecton close.');
    this.socket = null;
    this.emit('close');
  }
}

export default PassiveConnection;
