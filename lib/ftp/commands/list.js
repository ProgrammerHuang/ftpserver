import errors from '../../errors';

export default function (dir = null) {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(550);
    return;
  }

  return this.fs.list(dir)
  .tap((files) => {
    if (!files || !Array.isArray(files)) throw new errors.InvalidListArgument();
  })
  .tap(() => this.reply(150))
  .then((files) => files.map(file => file.buildStat()).join('\r\n'))
  .then((msg) => this.write(msg, this.dataSocket))
  .then(() => this.dataSocket.end())
  .then(() => this.reply(226, 'Transfer OK'))
  .catch((err) => {
    this.bunyan.error(err, {command: 'LIST'});
    return this.reply(431, err.code || 'No such directory');
  });
}
