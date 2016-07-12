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
    enqueue: true
  },
  USER: {
    fn: user,
    syntax: 'USER <username>',
    help: 'Set connection username',
    enqueue: true
  },
  PASS: {
    fn: pass,
    syntax: 'PASS <password>',
    help: 'Login with provided username and password',
    enqueue: true
  },
  ACCT: {
    fn: acct,
    syntax: 'ACCT <account>',
    help: 'Set connection account name',
    enqueue: true
  },
  SYST: {
    fn: syst,
    syntax: 'SYST',
    help: 'Get the current system',
    enqueue: true
  },
  FEAT: {
    fn: feat,
    sytax: 'FEAT',
    help: 'Get the command feature list',
    enqueue: true
  },
  OPTS: {
    fn: opts,
    syntax: 'OPTS <command> <option (optional)>',
    help: 'Set command option',
    enqueue: true
  },
  PWD: {
    fn: pwd,
    syntax: 'PWD',
    help: 'Get the working directory',
    enqueue: true
  },
  XPWD: { // synonym
    fn: pwd,
    syntax: 'XPWD',
    help: 'Get the working directory',
    enqueue: true
  },
  TYPE: {
    fn: type,
    syntax: 'TYPE <mode>',
    help: 'Set the transfer mode',
    enqueue: true
  },
  PASV: {
    fn: pasv,
    syntax: 'PASV',
    help: 'Initiate passive mode data connection',
    enqueue: true
  },
  PORT: {
    fn: port,
    syntax: 'PORT <x.x.x.x.x.x>',
    help: 'Set address and port for active data connection',
    enqueue: true
  },
  LIST: {
    fn: list,
    syntax: 'LIST <path (optional)>',
    help: 'Get information of a file or directory',
    enqueue: true
  },
  NLST: {
    fn: list,
    syntax: 'NLST <path (optional)>',
    help: 'Get list of file names',
    enqueue: true
  },
  CWD: {
    fn: cwd,
    syntax: 'CWD <path>',
    help: 'Set the working directory',
    enqueue: true
  },
  XCWD: { // synonym
    fn: cwd,
    syntax: 'XCWD <path>',
    help: 'Set the working directory',
    enqueue: true
  },
  STOR: {
    fn: stor,
    syntax: 'STOR <path>',
    help: 'Store a file at the given path',
    enqueue: true
  },
  APPE: {
    fn: stor,
    syntax: 'APPE <path>',
    help: 'Append or store a file at the given path',
    enqueue: true
  },
  CDUP: {
    fn: cdup,
    sytanx: 'CDUP',
    help: 'Move up a directory',
    enqueue: true
  },
  XCUP: { // synonym
    fn: cdup,
    sytanx: 'XCUP',
    help: 'Move up a directory',
    enqueue: true
  },
  RETR: {
    fn: retr,
    syntax: 'RETR <path>',
    help: 'Read contents of a file at the given path',
    enqueue: true
  },
  MKD: {
    fn: mkd,
    syntax: 'MKD <path>',
    help: 'Create the given directory',
    enqueue: true
  },
  XMKD: { // synonym
    fn: mkd,
    syntax: 'XMKD <path>',
    help: 'Create the given directory',
    enqueue: true
  },
  RMD: {
    fn: rmd,
    syntax: 'RMD <path>',
    help: 'Delete the given directory',
    enqueue: true
  },
  XRMD: { // synonym
    fn: rmd,
    syntax: 'XRMD <path>',
    help: 'Delete the given directory',
    enqueue: true
  },
  DELE: {
    fn: dele,
    syntax: 'DELE <path>',
    help: 'Delete the given file',
    enqueue: true
  },
  RNFR: {
    fn: rnfr,
    syntax: 'RNFR <current name>',
    help: 'Set file or directory to be renamed',
    enqueue: true
  },
  RNTO: {
    fn: rnto,
    syntax: 'RNTO <new name>',
    help: 'Rename the file from RNFR',
    enqueue: true
  },
  QUIT: {
    fn: quit,
    syntax: 'QUIT',
    help: 'Disconnect',
    enqueue: false
  },
  STAT: {
    fn: stat,
    syntax: 'STAT <path (optional)>',
    help: 'Get info on given file or directory, otherwise server status',
    enqueue: true
  },
  HELP: {
    fn: help,
    syntax: 'HELP <command (optional)>',
    help: 'Get info on given command, otherwise list supported commands',
    enqueue: true
  },
  NOOP: {
    fn: noop,
    syntax: 'NOOP',
    help: 'No operation',
    enqueue: true
  },
  ABOR: {
    fn: abor,
    syntax: 'ABOR',
    help: 'Cancel current file transfer',
    enqueue: false
  },
  SITE: {
    fn: site,
    syntax: 'SITE <command> <argument (optional)>',
    help: 'Run custom command',
    enqueue: true
  },
  SIZE: {
    fn: size,
    syntax: 'SIZE <path>',
    help: 'Get size of given file or directory',
    feat: 'SIZE',
    enqueue: true
  },
  MDTM: {
    fn: mdtm,
    syntax: 'MDTM <path>',
    help: 'Get last modified time of file or directory',
    feat: 'MDTM',
    enqueue: true
  },

  STRU: {
    fn: stru,
    syntax: 'STRU <type>',
    help: 'Set file transfer structure',
    enqueue: true,
    obsolete: true
  },
  MODE: {
    fn: mode,
    syntax: 'MODE <mode>',
    help: 'Set transfer mode',
    enqueue: true,
    obsolete: true
  },
  ALLO: {
    fn: allo,
    syntax: 'ALLO <size>',
    help: 'Allocate disk space for file',
    enqueue: true,
    obsolete: true
  }
};
