import stor from './stor';

// todo
export default function (dir) {
  return this.fs.generate(dir)
  .tap(stor)
  .then((fileName) => {
    return this.reply(250, fileName);
  });
}
