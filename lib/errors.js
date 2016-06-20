import util from 'util';

function BadCredentials() {
  this.statusCode = 401;
  this.name = 'BadCredentials';
  this.message = 'Invalid Username or password';
}
util.inherits(BadCredentials, Error);

function InvalidListArgument() {
  this.statusCode = 400;
  this.name = 'InvalidListArgument';
  this.message = 'List must be passed an array of files.';
}
util.inherits(InvalidListArgument, Error);

export default {
  BadCredentials,
  InvalidListArgument
};
