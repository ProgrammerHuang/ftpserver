export default function (path = null) {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(550);
    return;
  }

  return this.fs.list(path)
  .tap(() => this.reply(150))
  .then((files) => files.map((file) => file.buildMStat()))
  .catch((err) => {
    this.bunyan.error(err, {command: 'MLSD'});
    return this.reply(501);
  });
}
