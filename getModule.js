const ZCRMRestClient = require("zcrmsdk");
const wrap = require("./wrapresult");
module.exports = {
  fetch: async function(input, res) {
    const response = await ZCRMRestClient.API.MODULES.get(input);
    let data = JSON.parse(response.body).data;
    let result = wrap.wrapresult(input.module, data);
    res.set("Content-Type", "text/html");
    res.send(result);
  },

  search: function(input, res) {
    var extract = [];
    ZCRMRestClient.API.MODULES.search(input).then(function(response){
      try{
        let data = JSON.parse(response.body).data;
        // let result = wrap.wrapresult(input.module, data);
        // res.set("Content-Type", "text/html");
        // res.send(result);
        // console.log("data1~");
        // console.log(data);
        for(let i in data){
          let record = {};
          record.Module = input.module;
          record.Full_Name = data[i].Full_Name;
          record.Gender = data[i].Gender;
          record.Language = data[i].Language;
          record.Phone = data[i].Phone;
          record.Description = data[i].Description;
          extract.push(record);
        }
      } catch(error) {
        console.error(error);
        res.send("No such Info!");
      }
    });
    console.log("data1~");
    console.log(typeof extract);
    return extract;
  }
};
