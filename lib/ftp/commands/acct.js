export default function (accountName) {
  const SENT_USER_PASS = this.username && ~['PASS'].indexOf(this.previousCommand);
  if (!SENT_USER_PASS) {
    return this.reply(532);
  }

  this.authenticated = true;
  return this.reply(230);
}
