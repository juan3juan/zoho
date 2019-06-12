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
    ZCRMRestClient.API.MODULES.search(input).then(function(response) {
      try{
        let data = JSON.parse(response.body).data;
        let result = wrap.wrapresult(input.module, data);
        res.set("Content-Type", "text/html");
        res.send(result);
      } catch(error){
        console.error(error);
        res.send("No such Info!");
      }
    });
  }
};
