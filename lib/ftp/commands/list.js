import moment from 'moment';
import when from 'when';

import leftPad from '../../helpers/leftpad';
import errors from '../../errors';

export default function () {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  function buildFileEntry(file) {
    return [
      file.mode !== null
        ? [
          file.isDirectory() ? 'd' : '-',
          400 & file.mode ? 'r' : '-',
          200 & file.mode ? 'w' : '-',
          100 & file.mode ? 'x' : '-',
          40 & file.mode ? 'r' : '-',
          20 & file.mode ? 'w' : '-',
          10 & file.mode ? 'x' : '-',
          4 & file.mode ? 'r' : '-',
          2 & file.mode ? 'w' : '-',
          1 & file.mode ? 'x' : '-'
        ].join('')
        : file.isDirectory() ? 'drwxr-xr-x' : '-rw-r--r--',
      '1',
      'owner',
      'group',
      leftPad(file.size, 12),
      leftPad(moment(file.mtime).format('MMM DD HH:mm'), 12),
      file.name
    ].join(' ');
  }

  this.fs.list()
  .tap(files => {
    if (!files || !Array.isArray(files)) throw new errors.InvalidListArgument();
  })
  .tap(() => this.reply(150))
  .then(files => files.map(file => buildFileEntry(file)).join('\r\n'))
  .then((msg) => this.write(msg, this.dataSocket))
  .then(() => this.dataSocket.end())
  .then(() => this.reply(226, 'Transfer OK'))
  .catch((err) => {
    console.log('[list]', err);
    this.reply(431, err.code || 'No such directory');
  });
}
