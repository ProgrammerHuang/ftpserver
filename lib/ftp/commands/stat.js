export default function (file) {
  if (file) {
    // Return info on a file or directory, similar to LIST
    // Code 212 for file
    // Code 213 for directory
    // Reject with 450
    return this.reply(504);
  } else {
    // Reply with info/status of server
    return this.reply(211, 'TODO');
  }
}
