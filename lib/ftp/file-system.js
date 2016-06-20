import fsPath from 'path';
import when from 'when';
import whenNode from 'when/node';
var fs = whenNode.liftAll(require('fs'));

import File from './file';

export default class FileSystem {
  constructor(root) {
    this.dir = root || '/';
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

  chdir(dir) {
    return fs.stat(dir)
    .then((stat) => stat.isDirectory())
    .then(() => this.dir = dir);
  }
}
