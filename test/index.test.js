/* eslint no-unused-expressions: 0 */
import {expect} from 'chai';

import FTPServer from '../lib/ftp/server';
import FTPClient from 'jsftp';

describe('FTPServer', function () {
  this.timeout(4000);
  let ftpServer;
  let ftpClient;

  const CLIENT_OPTIONS = {
    host: '127.0.0.1',
    port: 7002, // defaults to 21
    user: 'user', // defaults to "anonymous"
    pass: '1234', // defaults to "@anonymous"
    debugMode: true
  };

  before(() => {
    ftpServer = new FTPServer({
      host: '127.0.0.1',
      port: 7002,
      pasvStart: 30000,
      pasvEnd: 31000,
      debugMode: true
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

    describe('stat', () => {

      it('runs successfully', (done) => {
        ftpClient.ls('/home/tyler/Documents', (err, data) => {
          expect(err).to.not.exist;
          expect(data).to.be.an('array');
          expect(data.length).to.be.above(0);
          done();
        });
      });

    });
  });

  describe.skip('procedures::', () => {

    before(() => {
      ftpClient = new FTPClient(CLIENT_OPTIONS);
    });
    after(() => {
      ftpClient.destroy();
    });

    describe('authentication ( user )', () => {

      it('runs successfully', (done) => {
        ftpClient.auth(ftpClient.user, ftpClient.pass, (err, data) => {
          expect(err).to.not.exist;
          expect(data.code).to.equal(230);
          done();
        });
      });

    });
  });
});
