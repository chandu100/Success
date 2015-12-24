fs = require('fs')
fs.readFile('../csv/total.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  else{


  var lines=data.trim().split("\n");

  var result = [];
  var headers=lines[0].trim().split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].trim().split(",");

    for(var j=1;j<headers.length-2;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);
  }
  //  console.log(JSON.stringify(result,null,4)); //JSON

   fs.writeFile("../json/Totalcountry.json", JSON.stringify(result, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to total.json");
    }
});
      }

});
