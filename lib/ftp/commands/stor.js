import fsPath from 'path';

export default function (fileName) {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(550);
    return;
  }

  const append = this.currentCommand === 'APPE';
  let filePath = fsPath.resolve(this.fs.dir, fileName);
  this.fs.write(filePath, append)
  .then((stream) => {
    stream.on('error', (err) => {
      this.bunyan.error(err);
      this.reply(552);
      this.dataSocket.end();
    });

    this.dataSocket.on('end', () => {
      this.reply(226);
    });

    this.reply(150);
    this.dataSocket.pipe(stream);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'STOR'});
    this.reply(553);
    if (this.dataSocket) {
      this.dataSocket.end();
    }
  });
}
