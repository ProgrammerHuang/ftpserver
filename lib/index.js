require('dotenv').config();

import FTPServer from './ftp/server';

class FTPApp {
  constructor() {
    this.server = new FTPServer();
    this.server.listen();
  }
}

export default new FTPApp();
