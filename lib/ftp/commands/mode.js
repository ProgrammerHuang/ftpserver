export default function (thisCmd, param) {
  return this.reply(param === 'S' ? 200 : 504);
}
