import when from 'when';

export default function (thisCmd, fileName) {
  if (!~['PORT', 'PASV'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  return this.fs.read(fileName)
  .tap(() => this.dataServer.onReady())
  .tap(() => this.reply(150))
  .then((stream) => {
    let deferred = when.defer();
    this.dataServer.socket.resume();
    stream
    .on('data', (chunk) => this.dataServer.write(chunk))
    .on('end', () => deferred.resolve(this.dataServer.end()))
    .on('error', (err) => deferred.reject(err));
    return deferred.promise;
  })
  .then(() => {
    return this.reply(226);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'RETR'});
    let code = 425;
    switch (err.code) {
      case 'EACCES': code = 451; break;
    }
    this.reply(code);
  });
}
