import app from '../';
import errors from '../errors';

class VendorAPI {
  constructor() {}

  authenticate(username, password) {
    return app.database.library.Vendor.find(username)
    .then(vendor => {
      if (!vendor) throw new errors.BadCredentials();
      vendor.checkPassword(password);
    });
  }
}

export default new VendorAPI();
