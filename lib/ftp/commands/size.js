export default function (file) {
  return this.fs.stat(file)
  .then((stat) => {
    return this.reply(213, stat.size);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'SIZE'});
    return this.reply(550);
  });
}
