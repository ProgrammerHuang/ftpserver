export default function (password) {
  const SENT_USER = this.username && ~['USER'].indexOf(this.previousCommand);
  if (this.server.options.anonymous && SENT_USER) {
    return this.reply(202, 'Permission granted with USER command.');
  }
  if (!this.username || !SENT_USER) {
    return this.reply(503); // Previous request must be USER
  }
  // 230 : permission granted
  // 332 : require account name (ACCT)

  this.authenticated = false;
  this.requireAccount = false;
  return this.authenticate(this.username, password)
  .then((resp = 230) => {
    if (resp !== 332) this.authenticated = true;
    else this.requireAccount = true;
    return this.reply(resp);
  })
  .catch(err => {
    this.bunyan.info(err, {command: 'PASS'});
    this.username = null;
    return this.reply(530, 'Authentication failed.');
  });
}
