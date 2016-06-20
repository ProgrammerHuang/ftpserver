import FTPServer from '../lib/ftp/server';

describe('FTPServer', function () {
  this.timeout(0);
  let ftpServer;

  before(() => {
    ftpServer = new FTPServer({
      host: '127.0.0.1',
      port: 7002,
      pasvStart: 30000,
      pasvEnd: 31000
    });
    ftpServer.listen();
  });

  it('Run server', (done) => {

  });
});
