/* eslint-disable no-console */
var express = require("express");
var ZCRMRestClient = require("zcrmsdk");

var app = express();

app.get("/", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    //getTokenOnetime();
    getContacts(res);
  });
});

app.get("/getContacts", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    //getTokenOnetime();
    res.send("This is a test");
  });
});

app.listen(3000, function() {
  console.log("listening on port 3000");
});

// eslint-disable-next-line no-unused-vars
function getTokenOnetime() {
  console.log("Start to generate tokens");
  var user_identifier = ZCRMRestClient.getUserIdentifier();
  var grant_token =
    "1000.9763c87722af17130125ab9332ddd50f.3f2defafba3f3aebe6c881f711ce26ff";
  ZCRMRestClient.generateAuthTokens(user_identifier, grant_token).then(function(
    auth_response
  ) {
    console.log("access token :" + auth_response.access_token);
    console.log("refresh token :" + auth_response.refresh_token);
    console.log("expires in :" + auth_response.expires_in);
  });
}

function getContacts(res) {
  var input = {};
  input.module = "Contacts";
  var params = {};
  params.page = 0;
  params.per_page = 100;
  input.params = params;
  ZCRMRestClient.API.MODULES.get(input).then(function(response) {
    var result = "<html><body><center><b>Leads</b></center><br />";
    var data = response.body;
    data = JSON.parse(data);
    data = data.data;
    console.log(data);
    for (var i in data) {
      var record = data[i];
      var name = record.Full_Name;
      result += "<span><center>" + name + "</center></span><br />";
    }
    result += "</body></html>";

    res.set("Content-Type", "text/html");
    res.send(result);
  });
}
