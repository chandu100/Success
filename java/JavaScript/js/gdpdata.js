fs = require('fs');

function sortByProperty(property) {
    console.log("called");
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] > b[property]) {
            sortStatus = -1;
        } else if (a[property] < b[property]) {
            sortStatus = 1;
        }
        return sortStatus;
    };
}


fs.readFile('../csv/Table1.3_g20_2013.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  else{
  var lines=data.trim().split("\n");

  var output = [];
  var headers=lines[0].trim().split(",");

  for(var i=1;i<lines.length-2;i++){
    var values = {};
	  var currentline=lines[i].trim().split(",");
    values["country_name"]=currentline[0];
		values["gdp"] = parseFloat(currentline[9]);
    output.push(values);
  }
  
  console.log(output);
  output.sort(sortByProperty("gdp"));
  var graph={
    "GDP_DATA":output
  }


   fs.writeFile("../json/gdpdata.json", JSON.stringify(graph, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to gdpdata.json");
    }
});
      }

});
