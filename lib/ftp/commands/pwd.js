import {encodePathname} from '../../helpers/fs';

export default function () {
  let dir = encodePathname(this.fs.dir);
  if (dir) return this.reply(257, dir + (this.fs.msg ? ' ' + this.fs.msg : ''));
  else return this.reply(550, 'Unable to parse current directory.');
}
