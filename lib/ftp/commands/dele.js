export default function (file) {
  return this.fs.delete(file)
  .then(() => {
    return this.reply(250);
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'DELE'});
    return this.reply(550);
  });
}
