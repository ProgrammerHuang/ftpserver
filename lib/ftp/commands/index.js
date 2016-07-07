/* eslint no-multi-spaces: 0*/
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
import mdtm from './mdtm';
import opts from './opts';
import stru from './stru';
import mode from './mode';
import allo from './allo';

/*
Command Types:
a: access control
p: parameter setting
s: service execution
*/

export default {
  AUTH: {
    fn: auth,
    syntax: 'AUTH <type>',
    help: 'Not current supported',
    type: ['a']
  },
  USER: {
    fn: user,
    syntax: 'USER <username>',
    help: 'Set connection username',
    type: ['a']
  },
  PASS: {
    fn: pass,
    syntax: 'PASS <password>',
    help: 'Login with provided username and password',
    type: ['a']
  },
  ACCT: {
    fn: acct,
    syntax: 'ACCT <account>',
    help: 'Set connection account name',
    type: ['a']
  },
  SYST: {
    fn: syst,
    syntax: 'SYST',
    help: 'Get the current system',
    type: ['s']
  },
  FEAT: {
    fn: feat,
    sytax: 'FEAT',
    help: 'Get the command feature list',
    type: ['s']
  },
  OPTS: {
    fn: opts,
    syntax: 'OPTS <command> <option (optional)>',
    help: 'Set command option',
    type: ['p']
  },
  PWD: {
    fn: pwd,
    syntax: 'PWD',
    help: 'Get the working directory',
    type: ['s']
  },
  XPWD: { // synonym
    fn: pwd,
    syntax: 'XPWD',
    help: 'Get the working directory',
    type: ['s']
  },
  TYPE: {
    fn: type,
    syntax: 'TYPE <mode>',
    help: 'Set the transfer mode',
    type: ['p']
  },
  PASV: {
    fn: pasv,
    syntax: 'PASV',
    help: 'Initiate passive mode data connection',
    type: ['p']
  },
  PORT: {
    fn: port,
    syntax: 'PORT <x.x.x.x.x.x>',
    help: 'Set address and port for active data connection',
    type: ['p']
  },
  LIST: {
    fn: list,
    syntax: 'LIST <path (optional)>',
    help: 'Get information of a file or directory',
    type: ['s']
  },
  NLST: {
    fn: list,
    syntax: 'NLST <path (optional)>',
    help: 'Get list of file names',
    type: ['s']
  },
  CWD: {
    fn: cwd,
    syntax: 'CWD <path>',
    help: 'Set the working directory',
    type: ['a']
  },
  XCWD: { // synonym
    fn: cwd,
    syntax: 'XCWD <path>',
    help: 'Set the working directory',
    type: ['a']
  },
  STOR: {
    fn: stor,
    syntax: 'STOR <path>',
    help: 'Store a file at the given path',
    type: ['s']
  },
  APPE: {
    fn: stor,
    syntax: 'APPE <path>',
    help: 'Append or store a file at the given path',
    type: ['s']
  },
  CDUP: {
    fn: cdup,
    sytanx: 'CDUP',
    help: 'Move up a directory',
    type: ['a']
  },
  XCUP: { // synonym
    fn: cdup,
    sytanx: 'XCUP',
    help: 'Move up a directory',
    type: ['a']
  },
  RETR: {
    fn: retr,
    syntax: 'RETR <path>',
    help: 'Read contents of a file at the given path',
    type: ['s']
  },
  MKD: {
    fn: mkd,
    syntax: 'MKD <path>',
    help: 'Create the given directory',
    type: ['s']
  },
  XMKD: { // synonym
    fn: mkd,
    syntax: 'XMKD <path>',
    help: 'Create the given directory',
    type: ['s']
  },
  RMD: {
    fn: rmd,
    syntax: 'RMD <path>',
    help: 'Delete the given directory',
    type: ['s']
  },
  XRMD: { // synonym
    fn: rmd,
    syntax: 'XRMD <path>',
    help: 'Delete the given directory',
    type: ['s']
  },
  DELE: {
    fn: dele,
    syntax: 'DELE <path>',
    help: 'Delete the given file',
    type: ['s']
  },
  RNFR: {
    fn: rnfr,
    syntax: 'RNFR <current name>',
    help: 'Set file or directory to be renamed',
    type: ['s', 'p']
  },
  RNTO: {
    fn: rnto,
    syntax: 'RNTO <new name>',
    help: 'Rename the file from RNFR',
    type: ['s']
  },
  QUIT: {
    fn: quit,
    syntax: 'QUIT',
    help: 'Disconnect',
    type: ['a']
  },
  STAT: {
    fn: stat,
    syntax: 'STAT <path (optional)>',
    help: 'Get info on given file or directory, otherwise server status',
    type: ['s']
  },
  HELP: {
    fn: help,
    syntax: 'HELP <command (optional)>',
    help: 'Get info on given command, otherwise list supported commands',
    type: ['s']
  },
  NOOP: {
    fn: noop,
    syntax: 'NOOP',
    help: 'No operation',
    type: ['s']
  },
  ABOR: {
    fn: abor,
    syntax: 'ABOR',
    help: 'Cancel current file transfer',
    type: ['s']
  },
  SITE: {
    fn: site,
    syntax: 'SITE <command> <argument (optional)>',
    help: 'Run custom command',
    type: ['s']
  },
  SIZE: {
    fn: size,
    syntax: 'SIZE <path>',
    help: 'Get size of given file or directory',
    feat: 'SIZE',
    type: ['s']
  },
  MDTM: {
    fn: mdtm,
    syntax: 'MDTM <path>',
    help: 'Get last modified time of file or directory',
    feat: 'MDTM',
    type: ['s']
  },

  STRU: {
    fn: stru,
    syntax: 'STRU <type>',
    help: 'Set file transfer structure',
    type: ['p'],
    obsolete: true
  },
  MODE: {
    fn: mode,
    syntax: 'MODE <mode>',
    help: 'Set transfer mode',
    type: ['p'],
    obsolete: true
  },
  ALLO: {
    fn: allo,
    syntax: 'ALLO <size>',
    help: 'Allocate disk space for file',
    type: ['s'],
    obsolete: true
  }
};
