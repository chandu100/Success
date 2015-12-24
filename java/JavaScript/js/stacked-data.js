fs = require('fs')
fs.readFile('../csv/Table1.3_g20_2013.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  else{
  var lines=data.trim().split("\n");

  var result = [];
  var headers=lines[0].trim().split(",");

  for(var i=1;i<lines.length-2;i++){
    var obj = {};
	  var currentline=lines[i].trim().split(",");
    obj["country"]=currentline[0];
		
    obj["Change_in_Population"]=parseFloat((((currentline[17]-currentline[14])/currentline[14])*100).toFixed(2));
    obj["Change_in_Purchasing_Power"]=parseFloat((((currentline[5]-currentline[2])/currentline[2])*100).toFixed(2));
    result.push(obj);
  }
  var plotdata={
    "STACKED_DATA":result
  }
  //  console.log(JSON.stringify(result,null,4)); //JSON

   fs.writeFile("../json/stackeddata.json", JSON.stringify(plotdata, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to stackeddata.json");
    }
});
      }

});
