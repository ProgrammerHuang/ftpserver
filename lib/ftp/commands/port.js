export default function (info) {
  console.log('PORT', info)
  info = info.split(',');
  if (info.length !== 6) return this.reply(425);

  let ip = info.slice(0, 4);
  let port = info.slice(5);
  this.reply(200);
}
