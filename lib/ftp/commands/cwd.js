import fsPath from 'path';

export default function (target) {
  let path = fsPath.resolve(this.fs.dir, target);
  this.fs.chdir(path)
  .then(() => {
    this.reply(250);
  })
  .catch((err) => {
    console.log('[cwd]', err);
    this.reply(550, err.Error || 'Path not found.')
  });
}
