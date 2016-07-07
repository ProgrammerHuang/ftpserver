import sequence from 'when/sequence';

export default function () {
  const FEATURES = ['SIZE', 'MDTM'];
  return this.reply('211', 'Extension supported:', null, false)
  .then(() => sequence(FEATURES.map((feature) => this.write.bind(this, ' ' + feature))))
  .then(() => this.reply(211, 'END'));
}
