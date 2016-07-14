import bunyan from 'bunyan';

import PassiveConnection from '../../../lib/ftp/connection/passive';

describe.skip('PassiveConnection', function() {
  this.timeout(100000);
  it('', (done) => {
    let pasv = new PassiveConnection({
      bunyan: bunyan.createLogger({name: 'PassiveConnection Test', level: 10})
    }, {
      pasvStart: 3031,
      pasvEnd: 4000
    });
    pasv.create()
    .then(() => pasv.onReady())
    .then((socket) => {
      console.log('pasv ready', socket);
    })
    .catch(done);
  });
});
