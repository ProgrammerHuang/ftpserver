export default function () {
  this.write('211-Extension supported:');
  // Feature list here, prefixed with a space
  this.reply(211, 'END');
}
