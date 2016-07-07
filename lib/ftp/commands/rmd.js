export default function (dir) {
  this.fs.delete(dir)
  .then(() => {
    this.reply(250);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'RMD'});
    this.reply(550);
  });
}
