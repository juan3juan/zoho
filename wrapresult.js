module.exports = {
  wrapresult: function(header, data) {
    let result = `<html>
    <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    </head>
    <div class="container">
    <div class="jumbotron">
      <h1><center>${header}</center></h1> 
    </div> 
    <table class="table table-dark">
    <tr>
    <th>Name</th>
    <th>Gender</th> 
    <th>Language</th>
    <th>Phone</th>
    <th>Description</th>
    </tr>`;
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
    result += `</tr>
    </tabel>
    </div>
    </body>
    </html>`;
    return result;
  }
};
