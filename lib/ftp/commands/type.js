export default function (dataEncoding) {
  dataEncoding = dataEncoding.toLocaleUpperCase();
  switch (dataEncoding) {
    case 'A':
      this.dataEncoding = 'utf8';
    case 'I':
    case 'L':
      this.dataEncoding = 'binary';
      return this.reply(200);
    default:
      return this.reply(501);
  }
}
