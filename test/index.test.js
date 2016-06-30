/* eslint no-unused-expressions: 0 */
import {expect} from 'chai';
import when from 'when';

import FTPServer from '../lib/ftp/server';
import FTPClient from 'jsftp';
import fsSync from 'fs';

describe('FTPServer', function () {
  this.timeout(2000);
  let ftpServer;
  let ftpClient;

  const CLIENT_OPTIONS = {
    host: '127.0.0.1',
    port: 8080,
    user: 'user', // defaults to "anonymous"
    pass: '1234', // defaults to "@anonymous"
    debugMode: true
  };

  before(() => {
    ftpServer = new FTPServer({
      host: '127.0.0.1',
      port: 8080,
      pasvStart: 30000,
      pasvEnd: 31000
    });
    ftpServer.listen();
  });

  after(() => {
    ftpServer.close();
  });

  describe('commands::', () => {
    before(() => {
      ftpClient = new FTPClient(CLIENT_OPTIONS);
    });
    after(() => {
      ftpClient.destroy();
    });
    describe('user', () => {

      it('runs successfully', (done) => {
        ftpClient.raw.user(ftpClient.user, (err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(331);
          done();
        });
      });

    });
    describe('pass', () => {

      it('runs successfully', (done) => {
        ftpClient.raw.pass(ftpClient.pass, (err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(230);
          done();
        });
      });

    });
    describe('type', () => {

      it('runs successfully', (done) => {
        ftpClient.raw.type('I', (err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(200);
          done();
        });
      });

    });
    describe('pwd', () => {

      it('runs successfully', (done) => {
        ftpClient.raw.pwd((err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(257);
          done();
        });
      });

    });

    describe('list', () => {

      it('runs successfully', (done) => {
        ftpClient.list('/home/tyler/Documents', (hasError, data) => {
          expect(hasError).to.equal(false);
          expect(data).to.exist;
          done();
        });
      });

    });

    describe('cwd', () => {

      it('runs successfully', (done) => {
        ftpClient.raw.cwd('/home/tyler/Documents', (err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(250);

          ftpClient.raw.pwd((err2, resp) => {
            expect(err2).to.not.exist;
            expect(resp.isError).to.equal(false);
            expect(resp.code).to.equal(257);
            expect(resp.text).to.match(/\/home\/tyler\/Documents/i);
            done();
          });
        });
      });

    });

    describe('stat', () => {

      it('fetches data on a single file', (done) => {
        ftpClient.raw.stat('./tyler/ftpserver/test/test.txt', (err, data) => {
          expect(err).to.not.exist;
          expect(data.code).to.equal(212);
          done();
        });
      });

      it('fetches data on a directory', (done) => {
        ftpClient.raw.stat('./tyler/ftpserver', (err, data) => {
          expect(err).to.not.exist;
          expect(data.code).to.equal(213);
          done();
        });
      });

    });

    describe('stor', () => {

      it('runs successfully', (done) => {
        ftpClient.put('./test/test.txt', 'put.txt', (hasError) => {
          expect(!!hasError).to.equal(false);
          done();
        });
      });

    });

    describe('retr', () => {

      it('runs successfully', (done) => {
        ftpClient.get('put.txt', './test/get.txt', (hasError) => {
          expect(!!hasError).to.equal(false);
          fsSync.unlinkSync('./test/get.txt');
          done();
        });
      });

    });

    describe('rnfr/rnto', () => {

      it('runs successfully', (done) => {
        ftpClient.rename('put.txt', 'renamed.txt', (err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(250);
          done();
        });
      });

    });

    describe('dele', () => {

      it('runs successfully', (done) => {
        ftpClient.raw.dele('renamed.txt', (err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(250);
          done();
        });
      });

    });
  });
});
