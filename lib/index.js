import FTPServer from './ftp/server';

class FTPApp {
  constructor() {
    this.server = new FTPServer({
      host: '127.0.0.1',
      port: 8080,
      pasvStart: 30000,
      pasvEnd: 31000,
      //logLevel: 60
    });
    this.server.listen();
  }
}

export default new FTPApp();
