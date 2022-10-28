const express = require('express');
const axios = require('axios');
const {GoogleAuth} = require('google-auth-library');
//const getAccessToken = require('./auth.js');

const app = express();
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// Example: https://my-cloud-run-service.run.app/books/delete/12345
// const url = 'https://TARGET_HOSTNAME/TARGET_URL';
// Example (Cloud Functions): https://project-region-projectid.cloudfunctions.net/myFunction
// const targetAudience = 'https://TARGET_AUDIENCE/';

const url = process.env.URL;
const targetAudience = process.env.TARGET_AUDIENCE;
const auth = new GoogleAuth();

var token;

// authentication function to get token from google cloud
const getAccessToken = async (req, res) => {
  console.info(`request ${url} with target audience ${targetAudience}`);
  const client = await auth.getIdTokenClient(targetAudience);
  res = await client.request({url});
  
  console.log(res.data);
  token = res.config.headers.Authorization.toString();
  if(!token) console.error('Failed to get the token. Make sure you have enabled the Cloud Functions API.');
}

// set the data which is to be sent to the cloud function
var data = JSON.stringify({
  "message": "hello cloud functions"
});

// call getAccessToken function to get token and 
// use the token send data to the cloud function 
// with axios post request
app.post("/api/calling_cloud_fn", async (req, res) => {
  data = req
  //console.log(data);
  token = getAccessToken().then(() => {
    //console.log(token);
    const config = {
      method: 'post',
      url: url,
      headers: { 
        //'Authorization': 'Bearer',
        'Authorization' : token,
        'Content-Type': 'application/json'
      },
      data :  data
    };
    
    axios(config).then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    }).catch((err) => {
      console.log('axios request failed with error: ' + err.message);
      res.status(500).send(err.message);
    });
  }).catch(err => {
    console.error('getAccessToken ERROR : ' + err.message);
    res.status(500).send(err.message);
  })
  
});
const PORT = process.env.PORT;
app.listen(PORT, () => { console.log("Server is up on port " + PORT); });
// end