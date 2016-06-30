import stor from './stor';

// Server creates file name, write sfile
// return with 250 {file name}
export default function (dir) {
  return this.fs.generate(dir)
  .then(stor);
}
