import {encodePathname} from '../../helpers/fs';

export default function (thisCmd, dir) {
  return this.fs.mkdir(dir)
  .then((madeDir) => {
    madeDir = encodePathname(madeDir);
    if (!madeDir) throw new Error('Unable to parse current directory.');
    return this.reply(257, madeDir);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'MKD'});
    return this.reply(550);
  });
}
