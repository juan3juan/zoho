/* eslint-disable no-console */
const express = require("express");
const ZCRMRestClient = require("zcrmsdk");
const mysql_util = require("zcrmsdk/lib/js/mysql/mysql_util");
const getbyModule = require("./getModule");
const initialzie = require("./Initialize");
const getInput = require("./getInput");
var bodyParser = require("body-parser");
const wrap = require("./wrapresult");
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
    //input.module = req.body.module;
    let modules = ["Leads", "Contacts"];
    let params = {};
    params.phone = req.body.phone;
    params.page = 0;
    params.per_page = 100;
    input.params = params;
    console.log(req.body.module);
    console.log(req.body.phone);
    let data = [];
    for(let i in modules){
      console.log(modules[i]);
      input.module = modules[i];
      //data = data.concat(getbyModule.search(input, res));
      Array.prototype.push.apply(data, getbyModule.search(input, res));
    }
    console.log('data~ ');
    console.log(data);
    //data = JSON.parse(response.body).data;
    // let arr1 = [{name: "lang", value: "English"},{name: "age", value: "18"}];
    // let arr2 = [{name : "childs", value: '5'}, {name: "lang", value: "German"}];
    // Array.prototype.push.apply(arr1, arr2);
    let result = wrap.wrapresult(input.module, data);
    res.set("Content-Type", "text/html");
    res.send(result);
  });
});

app.get("/search", function(req, res) {
  getInput.getInput(req, res);
});

// app.get("/test", function(req, res) {
//   ZCRMRestClient.initialize().then(function(){
//     var input = {};

//     // Filestream to read the file to be uploaded
//     var fs = require('fs');
  
//     // Specify the file-path of the file to be uploaded
//     var readStream = fs.createReadStream('/Users/yuruiwei/Downloads/NYIS_INC_CSR.xlsx');
  
//     input.x_file_content = readStream;
//     input.id='3890818000001319236';		// id: record-id to which the file is to be associated
//     input.module = 'Leads';
  
//     ZCRMRestClient.API.ATTACHMENTS.uploadFile(input).then(function(response) {
  
//       // Response of the API call is returned in the 'body'
  
//       // The file upload status is obtained from the first JSON object of the JSON Array corresponding
//       // to the 'data' key of the response
  
//         response = JSON.parse(response.body);
//         response = response.data[0];
  
//         console.log(response);
  
//         // The attachment id of the uploaded file can be obtained from response.details.id
//         console.log(response.details.id);
//     });
//   });
//   res.send("success");
// });

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
