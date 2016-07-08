export default function (thisCmd, username) {
  if (this.username && this.username !== username) return this.reply(530, 'Username already set.');
  this.username = username;
  if (this.server.options.anonymous) {
    this.authenticated = true;
    return this.reply(230);
  }
  return this.reply(331);
}
