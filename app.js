var express = require("express");
var ZCRMRestClient = require("zcrmsdk");
var mysql = require("mysql");
var mysql_util = require("zcrmsdk/lib/js/mysql/mysql_util");

var app = express();

app.get("/", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    //getTokenOnetime();
    getLeads();
  });

  //   var con = mysql.createConnection({
  //     host: "localhost",
  //     user: "root",
  //     password: "123456",
  //     database: "zohooauth"
  //   });
  //   con.connect(function(err) {
  //     if (err) throw err;
  //     console.log("Connected!");
  //     con.query(
  //       "INSERT INTO zohooauth.oauthtokens VALUES('124','124','124',123);",
  //       function(err, result) {
  //         if (err) throw err;
  //         console.log("Result: " + result);
  //       }
  //     );
  //   });
});

app.listen(3000, function() {
  console.log("listening on port 3000");
});
function getTokenOnetime() {
  console.log("Start to generate tokens");
  var user_identifier = "ywei@nyis.com";
  var grant_token =
    "1000.27d984730cfa3381658ebb861b832a7f.48eded60ec514acb434d23c765e042a7";
  ZCRMRestClient.generateAuthTokens(user_identifier, grant_token).then(function(
    auth_response
  ) {
    console.log("access token :" + auth_response.access_token);
    console.log("refresh token :" + auth_response.refresh_token);
    console.log("expires in :" + auth_response.expires_in);
  });
}

function getLeads() {
  var input = {};
  input.module = "Leads";
  var params = {};
  params.page = 0;
  params.per_page = 5;
  input.params = params;
  ZCRMRestClient.API.MODULES.get(input).then(function(response) {
    var result = "<html><body><b>Leads</b>";
    var data = response.body;
    data = JSON.parse(data);
    data = data.data;
    for (i in data) {
      var record = data[i];
      var name = record.Full_Name;
      result += "<span>" + name + "</span>";
    }
    result += "</body></html>";
  });
}
