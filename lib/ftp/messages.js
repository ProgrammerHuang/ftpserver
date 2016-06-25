export default {
  // remarks 100-199
  120: 'Service ready in %s minutes.',
  125: 'Data connection already open; transfer starting.',
  150: 'File status okay; about to open data connection.',
  // acceptance 200-399
  211: 'System status, or system help reply.',
  212: 'Directory status.',
  213: 'File status.',
  214: 'Help message.', // On how to use the server or the meaning of a particular non-standard command. This reply is useful only to the human user.
  215: 'FTP Server.', // NAME system type. Where NAME is an official system name from the list in the Assigned Numbers document.
  220: 'Service ready for new user.',
  221: 'Service closing control connection.', // Logged out if appropriate.
  225: 'Data connection open; no transfer in progress.',
  226: 'Closing data connection.', // Requested file action successful (for example, file transfer or file abort).
  227: 'Entering Passive Mode.', // (h1,h2,h3,h4,p1,p2).
  230: 'User logged in, proceed.',
  234: 'Honored',
  250: 'Requested file action okay, completed.',
  257: '\'%s\' created.',
  331: 'User name okay, need password.',
  332: 'Need account for login.',
  350: 'Requested file action pending further information.',
  // rejection 400-599
  421: 'Service not available, closing control connection.', // This may be a reply to any command if the service knows it must shut down.
  425: 'Can\'t open data connection.',
  426: 'Connection closed; transfer aborted.',
  450: 'Requested file action not taken.', // File unavailable (e.g., file busy).
  451: 'Requested action aborted. Local error in processing.',
  452: 'Requested action not taken.', // Insufficient storage space in system.
  500: 'Invalid syntax.', // Can close connection
  501: 'Invalid syntax for parameter.',
  502: 'Command not supported.',
  504: 'Command parameter not supported.',
  530: 'Not logged in.', // Permission Denied, Can close connection
  532: 'Need account for storing files.',
  550: 'Requested action not taken.', // File unavailable (e.g., file not found, no access).
  551: 'Requested action aborted. Page type unknown.',
  552: 'Requested file action aborted.', // Exceeded storage allocation (for current directory or dataset).
  553: 'Requested action not taken.' // File name not allowed.
};
