import sequence from 'when/sequence';
import commands from './index';

export default function () {
  const FEATURES = Object.keys(commands)
    .filter((cmd) => commands[cmd].hasOwnProperty('feat'))
    .map((cmd) => commands[cmd].feat);
  return this.reply(211, 'Extensions supported:', null, false)
  .then(() => sequence(FEATURES.map((feature) => this.write.bind(this, ' ' + feature))))
  .then(() => this.reply(211, 'End'));
}
