import fsPath from 'path';
import when from 'when';

export default function (fileName) {
  let filePath = fsPath.resolve(this.fs.dir, fileName);
  return this.fs.readFile(filePath)
  .tap(() => this.reply(150))
  .then((stream) => {
    let deferred = when.defer();
    stream
    .on('data', (chunk) => this.dataSocket.write(chunk, this.dataEncoding))
    .on('end', () => deferred.resolve(this.dataSocket.end()))
    .on('error', (err) => deferred.reject(err));
    return deferred.promise;
  })
  .then(() => {
    return this.reply(226);
  })
  .catch((err) => {
    let code = 425;
    switch (err.code) {
      case 'EACCES': code = 451; break;
    }
    this.reply(code);
  });
}
