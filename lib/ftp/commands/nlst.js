import list from './list';

export default function (dir = null) {
  return list.bind(this)(dir);
}
