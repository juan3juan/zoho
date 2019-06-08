/* eslint-disable no-console */
const express = require("express");
const ZCRMRestClient = require("zcrmsdk");
const mysql_util = require("zcrmsdk/lib/js/mysql/mysql_util");
const app = express();

app.get("/", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    mysql_util.getOAuthTokens().then(function(result) {
      if (result == null || result.length === 0) {
        //This token needs to be updated for initialization
        let token =
          "1000.ec2881e468d8e6c26dedb24f58dbb786.954fa251d7c0a21705c3cfa945658cfd";
        getTokenOnetime(token);
      } else {
        getContacts(res);
      }
    });
  });
});

app.get("/getLeads", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    getLeads(res);
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

// eslint-disable-next-line no-unused-vars
function getTokenOnetime(token) {
  console.log("Start to generate tokens");
  let user_identifier = ZCRMRestClient.getUserIdentifier();
  let grant_token = token;
  ZCRMRestClient.generateAuthTokens(user_identifier, grant_token).then(function(
    auth_response
  ) {
    console.log("access token :" + auth_response.access_token);
    console.log("refresh token :" + auth_response.refresh_token);
    console.log("expires in :" + auth_response.expires_in);
  });
}

function getContacts(res) {
  let input = {};
  input.module = "Contacts";
  let params = {};
  params.page = 0;
  params.per_page = 100;
  input.params = params;
  ZCRMRestClient.API.MODULES.get(input).then(function(response) {
    let data = response.body;
    data = JSON.parse(data);
    data = data.data;
    let result = wrapresult(input.module, data);
    res.set("Content-Type", "text/html");
    res.send(result);
  });
}

function getLeads(res) {
  let input = {};
  input.module = "Leads";
  let params = {};
  params.page = 0;
  params.per_page = 100;
  input.params = params;
  ZCRMRestClient.API.MODULES.get(input).then(function(response) {
    let data = response.body;
    data = JSON.parse(data);
    data = data.data;

    var result = wrapresult(input.module, data);

    res.set("Content-Type", "text/html");
    res.send(result);
  });
}

function wrapresult(header, data) {
  let result = `<html><body><center><b>${header}</b></center><br/>
  <table style="width:100%">
  <tr>
  <th>Name</th>
  <th>Gender</th> 
  <th>Language</th>
  <th>Phone</th>
  <th>Description</th>
  </tr>
  `;
  for (let i in data) {
    let record = data[i];
    const { Full_Name, Gender, Language, Phone, Description } = record;
    result += `<tr>
    <td align="middle"> ${Full_Name}</td>
    <td align="middle"> ${Gender}</td>
    <td align="middle"> ${Language}</td>
    <td align="middle"> ${Phone}</td>
    <td align="left"> ${Description}</td>
    <tr />`;
  }
  result += "</tr></tabel></body></html>";
  return result;
}
