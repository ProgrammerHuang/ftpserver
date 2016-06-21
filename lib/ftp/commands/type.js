export default function (dataEncoding) {
  dataEncoding = dataEncoding.toLocaleUpperCase();
  switch (dataEncoding) {
    case 'A':
      this.dataEncoding = 'utf8';
    case 'I':
    case 'L':
      this.dataEncoding = 'binary';
      this.reply(200);
      break;
    default:
      this.reply(501);
      break;
  }
}
