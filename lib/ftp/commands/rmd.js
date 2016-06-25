import fsPath from 'path';

export default function (dir) {
  let dirPath = fsPath.resolve(this.fs.dir, dir);
  this.fs.rmdir(dirPath)
  .then(() => {
    this.reply(250);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'RMD'});
    this.reply(550);
  });
}
