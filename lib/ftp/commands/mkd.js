import fsPath from 'path';

export default function (dir) {
  let dirPath = fsPath.resolve(this.fs.dir, dir);
  return this.fs.mkdir(dirPath)
  .then(() => {
    return this.reply(257, dirPath);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'MKD'});
    return this.reply(550);
  });
}
