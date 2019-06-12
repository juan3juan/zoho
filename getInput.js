module.exports = {
  getInput: function(req, res) {
    var html = "";
    html += "<body><center>";
    html += "<form action='/getByPhone'  method='post' name='form'>";
    html += "<select name='module'>";
    html += "<option name='Leads'>Leads</option>";
    html += "<option name='Contacts'>Contacts</option>";
    html += "<option name='Case'>Case</option>";
    html += "</select>";
    html += "</p>Mobile number:</p><input type='text' name='phone'>";
    html += "</p><input type='submit' value='submit'>";
    html += "<INPUT type='reset'  value='reset'>";
    html += "</form>";
    html += "</center></body>";
    res.send(html);
  },

  getInputTest: function(req, res) {
    let result = `
      <!DOCTYPE html>
        <html>
        <body>
        <h1>Search by Phone</h1>
            <form action="/getByPhone" method="post" name='form1'>
                    <select name='module'>
                        <option name="Leads">Leads</option>
                        <option name="Contacts">Contacts</option>
                        <option name="Case">Case</option>
                    </select>

                    <label for="phone">Phone:</label>
                    <input id="phone" type='text' name='phone' placeholder="Enter Phone Number"></input>

                    <input type="submit" value="Submit" />

            </form>
        </body>
        </html>`;
    //res.set("Content-Type", "text/html");
    res.send(result);
  }
};
