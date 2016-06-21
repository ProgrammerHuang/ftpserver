import fsPath from 'path';

export default function (target) {
  let path = fsPath.resolve(this.fs.dir, target);
  return this.fs.chdir(path)
  .then(() => {
    return this.reply(250);
  })
  .catch((err) => {
    console.log('[cwd]', err);
    return this.reply(550, err.Error || 'Path not found.')
  });
}
