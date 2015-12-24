fs = require('fs')
var result = [];

var data=fs.readFileSync('../csv/countrylist.csv', 'utf8');
var first=function (data) {

  var lines=data.trim().split("\n");

  var headers=lines[0].trim().split(",");

  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].trim().split(",");
		obj[currentline[0]] = currentline[1];
	  result.push(obj);
  }
  //  console.log(JSON.stringify(result,null,4)); //JSON

   fs.writeFile("../json/countrieslist.json", JSON.stringify(result, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to countrieslist.json");
    }
});
};

first(data);
