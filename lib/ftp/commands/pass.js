import vendorAPI from '../../api/vendor';

export default function (password) {
  if (!~['USER'].indexOf(this.previousCommand)) {
    this.reply(503);
    return;
  }

  vendorAPI.authenticate(this.username, password)
  .then(() => {
    this.authenticated = true;
    this.reply(230);
  })
  .catch(err => {
    console.log('[PASS - Error]', err);
    this.username = null;
    this.reply(530);
  });
}
