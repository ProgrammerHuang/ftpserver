require('dotenv').config();

import FTPServer from './ftp/server';

class FTPApp {
  constructor() {
    this.server = new FTPServer({
      host: '127.0.0.1',
      port: 7002,
      pasvStart: 30000,
      pasvEnd: 31000
    });
    this.server.listen();
  }
}

export default new FTPApp();
