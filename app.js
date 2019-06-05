var express = require("express");
var ZCRMRestClient = require("zcrmsdk");
var mysql = require("mysql");
var mysql_util = require("zcrmsdk/lib/js/mysql/mysql_util");

var app = express();

app.get("/", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    //getTokenOnetime();
    getLeads(res)


  });

    // var con = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "123456abc",
    //   database: "zohooauth"
    // });
    // con.connect(function(err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    //   con.query(
    //     "INSERT INTO zohooauth.oauthtokens VALUES('124','124','124',123);",
    //     function(err, result) {
    //       if (err) throw err;
    //       console.log("Result: " + result);
    //     }
    //   );
    // });
});

app.listen(3000, function() {
  console.log("listening on port 3000");
});

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

function getLeads(res) {
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
    for (i in data) {
      var record = data[i];
      var name = record.Full_Name;
      result += "<span><center>" + name + "</center></span><br />";
    }
    result += "</body></html>";
    
    res.set('Content-Type', 'text/html');
res.send(result);
    //para.write(result);
  });
}
