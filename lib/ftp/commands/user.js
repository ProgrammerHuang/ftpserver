export default function (username) {
  if (this.username && this.username !== username) return this.reply(530, 'Username already set.');
  if (this.server.anonymous) this.authenticated = true;
  this.username = username;
  return this.reply(331);
}
