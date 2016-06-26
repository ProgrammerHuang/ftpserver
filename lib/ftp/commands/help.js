import commands from './index';

export default function (command) {
  if (command) {
    if (commands.hasOwnProperty(command)) {
      // reply with how to use the command
      this.reply(214, 'Syntax: TODO');
    } else {
      this.reply(502, 'Unknown command ' + command);
    }
  } else {
    let supportedCommands = Object.keys(commands)
      .reduce((prev, cmd, index) => prev + (index % 5 === 0 ? '\r\n' : '\t') + cmd, '');

    this.reply(211, 'The following commands are supported:', null, false);
    this.write(supportedCommands);
    this.reply(211, 'Use "HELP <cmd>" for sytax help.');
  }
}
