function encodePathname(path, prepend = '"', prefix = '"') {
  if (!path || !path.length || typeof path !== 'string') return null;
  if (path[0] !== '/') path = '/' + path;
  return [
    prepend,
    path
      .replace(/"/g, '""')
      .replace(/\n/g, '\0'),
    prefix
  ].join('');
}

export default {
  encodePathname
};
