/* eslint
key-spacing: 0,
no-multi-spaces: 0,
comma-spacing: 0 */
import auth from './auth';
import user from './user';
import pass from './pass';
import acct from './acct';
import syst from './syst';
import feat from './feat';
import pwd  from './pwd';
import type from './type';
import pasv from './pasv';
import port from './port';
import list from './list';
import nlst from './nlst';
import cwd  from './cwd';
import stor from './stor';
import cdup from './cdup';
import retr from './retr';
import mkd  from './mkd';
import rmd  from './rmd';
import dele from './dele';
import rnfr from './rnfr';
import rnto from './rnto';
import quit from './quit';
import stat from './stat';
import help from './help';
import noop from './noop';
import size from './size';
import abor from './abor';
import site from './site';

import stru from './obsolete/stru';
import mode from './obsolete/mode';
import allo from './obsolete/allo';

export default {
  AUTH: auth,
  USER: user,
  PASS: pass,
  ACCT: acct,
  SYST: syst,
  FEAT: feat,
  PWD : pwd ,
  XPWD: pwd , // synonym
  TYPE: type,
  PASV: pasv,
  PORT: port,
  LIST: list,
  NLST: nlst,
  CWD : cwd ,
  XCWD: cwd , // synonym
  STOR: stor,
  APPE: stor,
  CDUP: cdup,
  XCUP: cdup, // synonym
  RETR: retr,
  MKD:  mkd ,
  XMKD: mkd , // synonym
  RMD:  rmd ,
  XRMD: rmd , // synonym
  DELE: dele,
  RNFR: rnfr,
  RNTO: rnto,
  QUIT: quit,
  STAT: stat,
  HELP: help,
  NOOP: noop,
  SIZE: size,
  ABOR: abor,
  SITE: site,

  STRU: stru,
  MODE: mode,
  ALLO: allo
};
