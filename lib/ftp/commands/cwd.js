export default function (target) {
  return this.fs.chdir(target)
  .then(() => {
    return this.reply(250);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'CWD'});
    return this.reply(550, err.Error || 'Path not found.');
  });
}
