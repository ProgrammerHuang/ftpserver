require('dotenv').config();

import FTPServer from './ftp/server';
import Database from '@autovance/database';

class FTPApp {
  constructor() {
    this.database = new Database('inventory');
    this.server = new FTPServer();
    this.server.listen();
  }
}

export default new FTPApp();
