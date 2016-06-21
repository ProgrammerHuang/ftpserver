import cwd from './cwd';

export default function () {
  return cwd.call(this, '..');
}
