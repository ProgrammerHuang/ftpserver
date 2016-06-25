export default function () {
  return this.reply('211', 'Extension supported:', null, false)
  // Feature list here, prefixed with a space
  .then(() => this.reply(211, 'END'));
}
