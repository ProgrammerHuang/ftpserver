export default function () {
  // 550 to reject
  let dir = this.fs.dir.replace('"', '""').replace('\f', '');
  return this.reply(257, '"' + dir + '"' + (this.fs.msg ? ' ' + this.fs.msg : ''));
}
