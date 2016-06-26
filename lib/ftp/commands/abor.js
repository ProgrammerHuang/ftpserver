export default function () {
  if (!this.dataSocket) {
    return this.reply(225);
  }

  if (this.dataSocketConnected) {
    this.dataSocket.end();
    return this.reply(226);
  }
  return this.reply(202);
}
