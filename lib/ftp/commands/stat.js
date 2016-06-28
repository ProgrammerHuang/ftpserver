export default function (path) {
  if (path) {
    return this.fs.get(path)
    .then((file) => {
      return {
        code: file.isDirectory() ? 213 : 212,
        msg: file.buildStat()
      };
    })
    .then(({code, msg}) => this.reply(code, msg))
    .catch((err) => {
      this.bunyan.error(err, {command: 'STAT'});
      return this.reply(450);
    });
  } else {
    // Reply with info/status of server
    return this.reply(211, 'TODO');
  }
}
