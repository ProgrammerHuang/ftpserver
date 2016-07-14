import when from 'when';

export default function (thisCmd, fileName) {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  const append = thisCmd === 'APPE';
  return when.promise((resolve, reject) => {
    return this.fs.write(fileName, append)
    .tap(() => this.dataServer.onReady())
    .then((stream) => {
      stream.on('error', (err) => {
        this.dataServer.socket.emit('error', err);
      });

      this.dataServer.socket.on('end', () => {
        this.dataServer.end();
        this.reply(226);
        resolve();
      });
      this.dataServer.socket.on('error', (err) => {
        this.bunyan.error(err);
        this.reply(552);
        reject(err);
      });

      this.dataServer.socket.pipe(stream);
      return this.reply(150);
    })
    .then(() => {
      this.dataServer.socket.resume();
    })
    .catch((err) => {
      this.bunyan.error(err, {command: 'STOR'});
      this.reply(553);
      this.dataServer.end();
      reject(err);
    });
  });
}
