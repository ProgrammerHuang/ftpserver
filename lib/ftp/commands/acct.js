export default function (accountName) {
  const SENT_USER_PASS = this.username && ~['PASS'].indexOf(this.previousCommand) && this.requireAccount;
  if (!SENT_USER_PASS) {
    return this.reply(532);
  }

  this.accountName = accountName;
  this.authenticated = true;
  delete this.requireAccount;
  return this.reply(230);
}
