/* eslint-disable no-console */
var express = require("express");
var ZCRMRestClient = require("zcrmsdk");
var mysql_util = require("zcrmsdk/lib/js/mysql/mysql_util");
var app = express();

app.get("/", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    mysql_util.getOAuthTokens().then(function(result) {
      if (result == null || result.length === 0) {
        //This token needs to be updated for initialization
        var token =
          "1000.ec2881e468d8e6c26dedb24f58dbb786.954fa251d7c0a21705c3cfa945658cfd";
        getTokenOnetime(token);
      } else {
        getContacts(res);
      }
    });
  });
});

app.get("/getLeades", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    getLeades(res);
  });
});

app.listen(3000, function() {
  console.log("listening on port 3000");
});

// eslint-disable-next-line no-unused-vars
function getTokenOnetime(token) {
  console.log("Start to generate tokens");
  var user_identifier = ZCRMRestClient.getUserIdentifier();
  var grant_token = token;
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

function getLeades(res) {
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
