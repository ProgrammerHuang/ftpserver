import commands from './index';

export default function (command) {
  if (command) {
    if (commands.hasOwnProperty(command)) {
      let {syntax, help, obsolete} = commands[command];

      if (obsolete) this.reply(214, 'OBSOLETE', null, false);
      this.reply(214, syntax, null, false);
      this.reply(214, help);
    } else {
      this.reply(502, 'Unknown command ' + command);
    }
  } else {
    let supportedCommands = Object.keys(commands)
      .filter((cmd) => !commands[cmd].obsolete)
      .reduce((prev, cmd, index) => prev + (index % 5 === 0 ? '\r\n' : '\t') + ' ' + cmd, '');

    this.reply(211, 'The following commands are supported:', null, false);
    this.write(supportedCommands);
    this.reply(211, 'Use "HELP <cmd>" for sytax help.');
  }
}
