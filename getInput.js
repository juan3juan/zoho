module.exports = {
  getInput: function(req, res) {
    let result = `
      <!DOCTYPE html>
        <html>
        <body>
        <center>
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
            </center>
        </body>
        </html>`;
    //res.set("Content-Type", "text/html");
    res.send(result);
  }
};
