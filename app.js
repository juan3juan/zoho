/* eslint-disable no-console */
const express = require("express");
const ZCRMRestClient = require("zcrmsdk");
const mysql_util = require("zcrmsdk/lib/js/mysql/mysql_util");
const getbyModule = require("./getModule");
const initialzie = require("./Initialize");
const getInput = require("./getInput");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const app = express();

app.get("/", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    mysql_util.getOAuthTokens().then(function(result) {
      if (result == null || result.length === 0) {
        //This token needs to be updated for initialization
        let token =
          "1000.03fec76e20038c566f1d04f6046e04ac.8d327ec87bed3062797c15aa7e34b7b6";
        initialzie.getTokenOnetime(token);
      } else {
        getContacts(res);
      }
    });
  });
});

app.get("/getLeads", function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    let input = {};
    input.module = "Leads";
    let params = {};
    params.page = 0;
    params.per_page = 100;
    input.params = params;

    getbyModule.fetch(input, res);
  });
});

app.post("/getByPhone", urlencodedParser, function(req, res) {
  ZCRMRestClient.initialize().then(function() {
    let input = {};
    input.module = req.body.module;
    let params = {};
    params.phone = req.body.phone;
    params.page = 0;
    params.per_page = 100;
    input.params = params;
    console.log(req.body.module);
    console.log(req.body.phone);
    getbyModule.search(input, res);
  });
});

app.get("/search", function(req, res) {
  getInput.getInputTest(req, res);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

function getContacts(res) {
  let input = {};
  input.module = "Contacts";
  let params = {};
  params.page = 0;
  params.per_page = 100;
  input.params = params;

  getbyModule.fetch(input, res);
}
