import errors from '../../errors';

export default function () {
  return this.reply(202);

  // TODO
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(550);
    return;
  }

  function buildFileEntry(file) {
    return file.name;
  }

  return this.fs.list()
  .tap(files => {
    if (!files || !Array.isArray(files)) throw new errors.InvalidListArgument();
  })
  .tap(() => this.reply(150))
  .then(files => files.map(file => buildFileEntry(file)).join('\r\n'))
  .then((msg) => this.write(msg, this.dataSocket))
  .then(() => this.dataSocket.end())
  .then(() => this.reply(226, 'Transfer OK'))
  .catch((err) => {
    console.log(err)
    this.reply(431, err.code || 'No such directory');
  });
}
