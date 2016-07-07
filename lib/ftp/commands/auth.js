export default function (type) {
  return this.reply(502);
  // http://tools.ietf.org/html/rfc2228
  // type not understood: 504
  // type not allowed: 534
  // unable to accept: 431
  // willing, but requires security data: 334 (security data then sent (ADAT))
  // willing, security data not required: 234
}
