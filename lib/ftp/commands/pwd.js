export default function () {
  // 550 to reject
  console.log('fs dir', this.fs.dir)
  let dir = this.fs.dir.replace('"', '""').replace('\f', '');
  this.reply(257, '"' + dir + '"' + (this.fs.msg ? ' ' + this.fs.msg : ''));
}
