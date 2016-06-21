export default function () {
  this.reply('211', 'Extension supported:', null, false);
  // Feature list here, prefixed with a space
  this.reply(211, 'END');
}
