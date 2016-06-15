export default function (username) {
  this.username = username;
  this.emit('username', this.username, () => this.reply(331), () => this.reply(530));
}
