export default function (thisCmd, cmd, option) {
  console.log('OPTS', cmd, option)
  return this.reply(501);
}
