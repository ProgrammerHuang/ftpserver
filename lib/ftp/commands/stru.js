export default function (thisCmd, param) {
  return this.reply(param === 'F' ? 200 : 504);
}
