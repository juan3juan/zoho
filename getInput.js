module.exports = {
    getInput: function(req, res) {
        var html='';
        html +="<body><center>";
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
        <head>
        <meta charset="utf-8" />
        <title>CSS3 Contact Form</title>
        </head>
        <body>
        <div id="contact">
        <h1>Search by Phone</h1>
            <form action="/getByPhone" method="post" name='form1'>
                    <select>
                        <option value="leads">Leads</option>
                        <option value="contacts">Contacts</option>
                        <option value="case">Case</option>
                    </select>

                    <label for="phone">Phone:</label>
                    <input id="phone" placeholder="Enter Phone Number"></input>

                    <input type="submit" value="Submit" />

            </form>
        </div>
        </body>
        </html>`;

      res.set("Content-Type", "text/html");
      res.send(result);
    }
  };
  