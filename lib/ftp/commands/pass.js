export default function (password) {
  if (!this.username || !~['USER'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  this.authenticate(this.username, password)
  .then(() => {
    this.authenticated = true;
    this.reply(230);
  })
  .catch(err => {
    console.log('[PASS]', err);
    this.username = null;
    this.reply(530);
  });
}
