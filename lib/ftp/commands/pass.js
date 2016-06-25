export default function (password) {
  const SENT_USER = this.username && ~['USER'].indexOf(this.previousCommand);
  if (this.server.anonymous && SENT_USER) {
    return this.reply(202); // Permission was granted with USER command
  }
  if (!this.username || !SENT_USER) {
    return this.reply(503); // Previous request must be USER
  }
  // 230 : permission granted
  // 332 : require account name (ACCT)

  return this.authenticate(this.username, password)
  .then((resp = 230) => {
    this.authenticated = true;
    return this.reply(resp);
  })
  .catch(err => {
    this.bunyan.log(err, {command: 'PASS'});
    this.username = null;
    return this.reply(530);
  });
}
