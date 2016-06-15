export default function (dataEncoding) {
  switch (dataEncoding.toLocaleUpperCase()) {
    case 'A':
      this.dataEncoding = 'utf8';
    case 'I':
      this.dataEncoding = 'binary';
      this.reply(200);
      break;
    default:
      this.reply(501);
      break;
  }
}
