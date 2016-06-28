export default function (username) {
  this.username = username;
  return this.reply(331);
}
