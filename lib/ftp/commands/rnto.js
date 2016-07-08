export default function (thisCmd, newName) {
  if (!~['RNFR'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  return this.fs.rename(null, newName)
  .then(() => {
    this.reply(250);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'RNTO'});
    this.reply(550);
  });
}
