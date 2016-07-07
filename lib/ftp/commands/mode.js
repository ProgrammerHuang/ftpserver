export default function (param) {
  return this.reply(param === 'S' ? 200 : 504);
}
