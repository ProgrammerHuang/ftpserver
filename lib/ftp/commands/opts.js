export default function (cmd, option) {
  console.log('OPTS', cmd, option)
  return this.reply(501);
}
