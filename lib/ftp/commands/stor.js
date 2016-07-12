export default function (thisCmd, fileName) {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  const append = thisCmd === 'APPE';
  this.fs.write(fileName, append)
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
