import cwd from './cwd';

export default function (thisCmd) {
  return cwd.call(this, thisCmd, '..');
}
