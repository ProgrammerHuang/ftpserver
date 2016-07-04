export default function (argDir = null) {
  // 550 to reject
  let dir = (argDir || this.fs.dir).replace('"', '""').replace('\f', '');
  return this.reply(257, '"' + dir + '"' + (this.fs.msg ? ' ' + this.fs.msg : ''));
}
