export default class File {
  constructor(path) {
    this.path = path;
    this.size = 0;
    this.type = 'f';
    this.mtime = new Date(0);
    this.mode = null;
  }

  isDirectory(){
    return this.type.toLocaleLowerCase() === 'd';
  }

  get name() {
    if (!this.path) return undefined;
    return this.path.split('/').slice(-1)[0];
  }

  fromStat(stat) {
    /*{ dev: 2054,
    mode: 16893,
    nlink: 4,
    uid: 1000,
    gid: 1000,
    rdev: 0,
    blksize: 4096,
    ino: 2366759,
    size: 4096,
    blocks: 8,
    atime: 2016-06-19T19:09:16.257Z,
    mtime: 2016-06-19T17:47:15.079Z,
    ctime: 2016-06-19T19:09:16.253Z,
    birthtime: 2016-06-19T19:09:16.253Z }*/
    this.size = stat.size;
    this.mtime = new Date(stat.mtime);
    this.type = stat.isDirectory() ? 'd' : 'f';
    this.mode = stat.mode;
    return this;
  }
}
