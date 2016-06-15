export default function (password) {
  if (this.previousCommand !== 'USER') {
    this.reply(503);
    return;
  }

  function resolve() {
    this.reply(230);
  }

  function reject() {
    this.username = null;
    this.reply(530);
  }

  this.emit('password', password, resolve.bind(this), reject.bind(this));
};
