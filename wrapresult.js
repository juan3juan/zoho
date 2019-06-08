module.exports = {
  wrapresult: function(header, data) {
    let result = `<html><body><center><b>${header}</b></center><br/>
    <table style="width:100%">
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
    result += "</tr></tabel></body></html>";
    return result;
  }
};
