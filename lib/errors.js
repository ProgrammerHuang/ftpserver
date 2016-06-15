import util from 'util';

function BadCredentials() {
  this.statusCode = 401;
  this.name = 'BadCredentials';
  this.message = 'Invalid Username or password';
}
util.inherits(BadCredentials, Error);

function VendorNotFound(vendorName) {
  let vendNotification = vendorName ? ` by vendor name: ${vendorName}` : '';
  this.statusCode = 400;
  this.name = 'VendorNotFound';
  this.message = `Unable to find vendor${vendNotification}.`;
}
util.inherits(VendorNotFound, Error);

function DealerNotFound(integrationId, vendorName) {
  let intNotification = integrationId ? ` by integration ID: ${integrationId}` : '';
  let vendNotification = vendorName ? ` (${integrationId})` : '';
  this.statusCode = 400;
  this.name = 'DealerNotFound';
  this.message = `Unable to find vendor${intNotification}${vendNotification}.`;
}
util.inherits(DealerNotFound, Error);

export default {
  BadCredentials,
  VendorNotFound,
  DealerNotFound
};
