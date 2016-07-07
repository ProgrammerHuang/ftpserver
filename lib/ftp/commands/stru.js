export default function (param) {
  return this.reply(param === 'F' ? 200 : 504);
}
