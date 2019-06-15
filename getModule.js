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

  search: async function(input, modules, res) {
    var extract = [];
    for (let i = 0; i < modules.length; i++) {
      input.module = modules[i];
      let response = await ZCRMRestClient.API.MODULES.search(input);
      try {
        let data = JSON.parse(response.body).data;

        for (let i in data) {
          var record = {};
          record.Module = input.module;
          record.Full_Name = data[i].Full_Name;
          record.Gender = data[i].Gender;
          record.Language = data[i].Language;
          record.Phone = data[i].Phone;
          record.Description = data[i].Description;
          extract.push(record);
        }
      } catch (error) {
        res.send("No such Info!");
      }
    }
    let result = wrap.wrapresult("Modules", extract);
    res.set("Content-Type", "text/html");
    res.send(result);
  }
};
