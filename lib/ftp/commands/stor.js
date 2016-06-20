import fsPath from 'path';
import fs from 'fs';

export default function (fileName) {
  let filePath = fsPath.resolve(this.fs.dir, fileName);
  console.log(filePath)
}
