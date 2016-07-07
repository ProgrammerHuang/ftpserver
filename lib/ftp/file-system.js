import fsPath from 'path';
import when from 'when';
import whenNode from 'when/node';
import syncFs from 'fs';
var fs = whenNode.liftAll(syncFs);

import File from './file';

export default class FileSystem {
  constructor(root) {
    this.dir = root || '/';
    this.msg = null;

    this.temp = null;
  }

  list(dir = null) {
    dir = dir || this.dir;
    return fs.readdir(dir)
    .tap((itemNames) => Array.isArray(itemNames))
    .then((itemNames) => itemNames.map(name => fsPath.join(dir, name)))
    .then((itemPaths) => itemPaths.filter(path =>
      fs.access(path, fs.R_OK | fs.W_OK)
      .then(() => true)
      .catch(() => false)
    ))
    .then((itemPaths) => when.settle(itemPaths.map(path => fs.stat(path).then((stat) => new File(path).fromStat(stat)))))
    .then((itemPromises) => itemPromises.filter(promise => promise.state === 'fulfilled'))
    .then((itemPromises) => itemPromises.map(promise => promise.value));
  }

  write(filePath, append = false) {
    filePath = fsPath.resolve(this.dir, filePath);
    return when.try(() => {
      return syncFs.createWriteStream(filePath, {flags: !append ? 'w+' : 'a+'});
    });
  }

  read(filePath) {
    filePath = fsPath.resolve(this.dir, filePath);
    return when.try(() => {
      return syncFs.createReadStream(filePath, {flags: 'r'});
    });
  }

  get(path) {
    path = fsPath.resolve(this.dir, path);
    return fs.stat(path)
    .then((stat) => new File(path).fromStat(stat));
  }

  chdir(dir) {
    dir = fsPath.resolve(this.dir, dir);
    return fs.stat(dir)
    .then((stat) => {
      if (!stat.isDirectory()) throw new Error('Argument is not a valid directory.');
    })
    .then(() => this.dir = dir);
  }

  mkdir(dir) {
    dir = fsPath.resolve(this.dir, dir);
    return fs.mkdir(dir)
    .then(() => dir);
  }

  delete(path) {
    path = fsPath.resolve(this.dir, path);
    return fs.stat(path)
    .then((stat) => {
      if (stat.isFile()) return fs.unlink(path);
      else if (stat.isDirectory()) return fs.rmdir(path);
    });
  }

  rename(oldName, newName = null) {
    return when.try(() => {
      if (oldName && !newName) {
        let oldPath = fsPath.resolve(this.dir, oldName);
        return fs.stat(oldPath)
        .then((stat) => {
          if (!stat.isFile()) throw new Error('File does not exist.');
          this.temp = oldPath;
        });
      } else {
        if (!this.temp) throw new Error('Unable to resolve old name.');
        let newPath = fsPath.resolve(this.dir, newName);
        let oldPath = this.temp;
        this.temp = null;
        return fs.rename(oldPath, newPath);
      }
    });
  }

  generate(dir) {
    dir = fsPath.resolve(this.dir, dir);
    return when.try(() => {
      // todo: generate unique file name
      return 'test.txt';
    });
  }
}
