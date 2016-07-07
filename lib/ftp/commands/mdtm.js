import moment from 'moment';

export default function (file) {
  return this.fs.stat(file)
  .then((stat) => {
    return this.reply(213, moment(stat.mtime).format('YYYYMMDDHHmmss'));
  })
  .catch((err) => {
    this.bunyan.error(err, {command: 'SIZE'});
    return this.reply(550);
  });
}
