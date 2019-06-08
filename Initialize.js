/* eslint-disable no-console */
const ZCRMRestClient = require("zcrmsdk");
module.exports = {
  getTokenOnetime: function(token) {
    console.log("Start to generate tokens");
    let user_identifier = ZCRMRestClient.getUserIdentifier();
    let grant_token = token;
    ZCRMRestClient.generateAuthTokens(user_identifier, grant_token).then(
      function(auth_response) {
        console.log("access token :" + auth_response.access_token);
        console.log("refresh token :" + auth_response.refresh_token);
        console.log("expires in :" + auth_response.expires_in);
      }
    );
  }
};
