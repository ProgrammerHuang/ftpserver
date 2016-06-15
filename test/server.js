import {expect} from 'chai';
import FTPServer from '../lib/ftp/server';

describe('FTPServer', function () {
  this.timeout(0);

  let server;

  beforeEach(() => {
    server = new FTPServer();
  });

  afterEach(() => {
    server.close();
  });

  it('should have unit test!', (done) => {
    server.listen().then(() => {
      server.on('connection', (client) => {
        client.on('username', (username, resolve, reject) => {
          resolve();
        });
        client.on('password', (password, resolve, reject) => {
          resolve();
        });
      });
    });
  });
});
