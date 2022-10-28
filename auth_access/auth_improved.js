/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// Example: https://my-cloud-run-service.run.app/books/delete/12345
// const url = 'https://TARGET_HOSTNAME/TARGET_URL';
const url = '';


// Example (Cloud Functions): https://project-region-projectid.cloudfunctions.net/myFunction
// const targetAudience = 'https://TARGET_AUDIENCE/';
const targetAudience = '';

const {GoogleAuth} = require('google-auth-library');
const axios = require('axios');
var token;
const auth = new GoogleAuth();

const getAccessToken = async (req, res) => {
  console.info(`request ${url} with target audience ${targetAudience}`);
  const client = await auth.getIdTokenClient(targetAudience);
  res = await client.request({url});
  
  console.log(res.data);
  token = res.config.headers.Authorization.toString();
  return token;
}

module.exports = getAccessToken;
