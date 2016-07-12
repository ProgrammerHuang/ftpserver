import commands from './index';

export default function (cmd, command) {
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
      .filter((commd) => !commands[commd].obsolete)
      .reduce((prev, commd, index) => prev + (index % 5 === 0 ? '\r\n' : '\t') + ' ' + commd, '');

    this.reply(211, 'The following commands are supported:', null, false);
    this.write(supportedCommands);
    this.reply(211, 'Use "HELP <cmd>" for sytax help.');
  }
}
