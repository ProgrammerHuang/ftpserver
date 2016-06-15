import path from 'path';
import fs from 'fs';

import dealerAPI from '../../api/dealer';

export default function (fileName) {
  const integrationId = fileName.replace(/\//m, '');
  const serverPath = path.join(this.cwd, fileName);

  dealerAPI.fetchByIntegrationId(this.username, integrationId)
  .then(dealer => {

  })
  .catch(err => {
    console.log(err);
  });
}
