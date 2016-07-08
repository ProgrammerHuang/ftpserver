import moment from 'moment';
import leftPad from '../helpers/leftpad';

export default class File {
  constructor(path) {
    this.path = path;
    this.size = 0;
    this.type = 'f';
    this.mtime = 0;
    this.ctime = 0;
    this.ino = null;
    this.dev = null;
    this.uid = null;
    this.mode = null;
  }

  get name() {
    if (!this.path) return undefined;
    return this.path.split('/').slice(-1)[0];
  }

  get unique() {
    return this.dev.toString(16) + 'U' + this.ino.toString(16);
  }

  isDirectory(){
    return this.type.toLocaleLowerCase() === 'd';
  }

  isFile(){
    return this.type.toLocaleLowerCase() === 'f';
  }

  fromStat(stat) {
    this.size = stat.size;
    this.mtime = moment(stat.mtime).utc().valueOf();
    this.ctime = moment(stat.ctime).utc().valueOf();
    this.type = stat.isDirectory() ? 'd' : 'f';
    this.mode = stat.mode;
    this.uid = stat.uid;
    this.ino = stat.ino;
    this.dev = stat.dev;
    return this;
  }

  buildMStat() {
    let type = this.name === '' || this.name === '.' ? 'cdir' :
      this.name === '../' || this.name === '..' ? 'pdir' :
      this.isDirectory() ? 'dir' : 'file';
    let perm = null;

    return [
      'size=' + this.size,
      'modify=' + moment(this.mtime).format('YYYYMMDDHHmmss.SSS'),
      'create=' + moment(this.ctime).format('YYYYMMDDHHmmss.SSS'),
      'unique=' + this.uid,
      'perm=' + perm,
      'type=' + type
    ].join(';');
  }

  buildStat() {
    return [
      this.mode !== null
        ? [
          this.isDirectory() ? 'd' : '-',
          400 & this.mode ? 'r' : '-',
          200 & this.mode ? 'w' : '-',
          100 & this.mode ? 'x' : '-',
          40 & this.mode ? 'r' : '-',
          20 & this.mode ? 'w' : '-',
          10 & this.mode ? 'x' : '-',
          4 & this.mode ? 'r' : '-',
          2 & this.mode ? 'w' : '-',
          1 & this.mode ? 'x' : '-'
        ].join('')
        : this.isDirectory() ? 'drwxr-xr-x' : '-rw-r--r--',
      '1',
      'owner',
      'group',
      leftPad(this.size, 12),
      leftPad(moment(this.mtime).format('MMM DD HH:mm'), 12),
      this.name
    ].join(' ');
  }
}
