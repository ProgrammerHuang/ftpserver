import https from 'https';
import _ from 'lodash';
import when from 'when';

import errors from '../errors';

class DealerAPI {
  constructor() {}


  fetchByIntegrationId(vendorName, integrationId) {
    return this.fetchByVendor(vendorName)
    .then(list => _.find(list, v => v.dms_integration_id === integrationId))
    .then(dealer => {
      if (dealer) return dealer;
      else throw new errors.DealerNotFound(integrationId, vendorName);
    });
  }

  fetchByVendor(vendorName) {
    return this.fetch()
    .then(list => {
      if (list.hasOwnProperty(vendorName)) {
        return list[vendorName];
      } else {
        throw new errors.VendorNotFound(vendorName);
      }
    });
  }

  fetch() {
    let defer = when.defer();
    var request = https.request({
      hostname: process.env.DEALER_API_HOST,
      port: process.env.DEALER_API_PORT,
      path: process.env.DEALER_API_PATH,
      method: 'GET',
      headers: {
        apikey: process.env.DEALER_API_KEY
      },
      rejectUnauthorized: false
    }, (response) => {
      let str = '';
      response.on('data', (chunk) => str += chunk);
      response.on('end', () => {
        const json = JSON.parse(str);
        if (json.hasOwnProperty('message')) {
          let err = new Error(json.message);
          err.code = json.code;
          defer.reject(err);
          return;
        }
        const filtered = _.filter(json, j => j.dms_integration_is_active && j.dms_integration_is_active !== 'false');
        const organized = _.groupBy(filtered, f => f.dms_integration_is_active);
        defer.resolve(organized);
      });
    });
    request.on('error', (err) => defer.reject(err));
    request.end();

    return defer.promise;
  }
}

export default new DealerAPI();
