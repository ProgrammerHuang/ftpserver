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

  readFile(filePath) {
    return fs.stat(filePath)
    .then((stat) => stat.isFile())
    .then(() => syncFs.createReadStream(filePath, {flags: 'r'}));
  }

  chdir(dir) {
    return fs.stat(dir)
    .then((stat) => stat.isDirectory())
    .then(() => this.dir = dir);
  }
}
