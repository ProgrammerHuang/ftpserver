/* eslint no-unused-expressions: 0 */
import {expect} from 'chai';

import FTPServer from '../lib/ftp/server';
import FTPClient from 'jsftp';
import fsSync from 'fs';

describe('FTPServer', function () {
  this.timeout(4000);
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

    describe.skip('stat', () => {

      it('runs successfully', (done) => {
        ftpClient.ls('/home/tyler/Documents', (err, data) => {
          expect(err).to.not.exist;
          expect(data).to.be.an('array');
          expect(data.length).to.be.above(0);
          done();
        });
      });

    });

    describe('stor', () => {

      it('runs successfully', (done) => {
        ftpClient.put('./test/test.txt', '/home/tyler/Documents/put.txt', (hasError) => {
          expect(!!hasError).to.equal(false);
          done();
        });
      });

    });

    describe('retr', () => {

      it('runs successfully', (done) => {
        ftpClient.get('/home/tyler/Documents/put.txt', './test/get.txt', (hasError) => {
          expect(!!hasError).to.equal(false);
          fsSync.unlinkSync('./test/get.txt');
          done();
        });
      });

    });

    describe('dele', () => {

      it('runs successfully', (done) => {
        ftpClient.raw.dele('/home/tyler/Documents/put.txt', (err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(250);
          done();
        });
      });

    });

    describe('rnfr', () => {

      it('runs successfully', (done) => {
        ftpClient.raw.dele('/home/tyler/Documents/put.txt', (err, data) => {
          expect(err).to.not.exist;
          expect(data.isError).to.equal(false);
          expect(data.code).to.equal(250);
          done();
        });
      });

    });
  });
});
