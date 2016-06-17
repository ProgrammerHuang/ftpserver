import moment from 'moment';
import when from 'when';

import leftPad from '../../helpers/leftpad';

export default function () {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  this.emit('directory list', this.cwd);


  /*if (this.cwd === '/') {
    let date = moment.utc().subtract(1, 'day');
    dealerAPI.fetchByVendor(this.username)
    .tap(() => this.reply(150, null, this.dataSocket))
    .then((dealers) => dealers.map(({dms_integration_id}) => [
      'drwxr-xr-x 1',
      'owner',
      'group',
      leftPad(Math.floor(Math.random() * 1000), 12),
      leftPad(date.format('MMM DD HH:mm'), 12),
      dms_integration_id
    ].join(' ')).join('\r\n'))
    .then(msg => this.write(msg, this.dataSocket))
    .then(() => this.reply(226, 'Transfer OK', this.dataSocket))
    .catch(err => {
      console.log(err);
      this.reply(431, 'No such directory');
    });
  } else {
    this.reply(150, null, this.dataSocket)
    .then(() => this.reply(226, null, this.dataSocket));
  }*/
}
