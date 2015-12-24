var fs = require('fs')
var data=fs.readFileSync('../csv/Table1.3_g20_2013.csv', 'utf8');
var countrieslist=fs.readFileSync('../csv/countrylist.csv','utf-8');
  var result = [];
  var flag=0;
var setdata=function (data,countrieslist){
  var lines=data.trim().split("\n");
  var lines2=countrieslist.trim().split("\n");

  var headers=lines[0].trim().split(",");

  for(var i=1;i<lines.length-2;i++){
    var obj = {};
	  var currentline=lines[i].trim().split(",");

    for(j=1;j<lines2.length;j++){
      var currentline2=lines2[j].trim().split(",");
      if(currentline[0]===currentline2[1])
      {
        flag=0;
        for(k=0;k<result.length;k++)
        {
          if(currentline2[0]===result[k].continent){
            result[k].population = parseFloat((parseFloat(result[k].population) + parseFloat(currentline[5])*10).toFixed(2));
            result[k].gdp = parseFloat((parseFloat(result[k].gdp) + parseFloat(currentline[9])).toFixed(2));
            flag=1;
          }
        }
          if(flag!=1){
            obj["continent"]=currentline2[0];
            obj["population"] = parseFloat(currentline[5])*10;
            obj["gdp"]=parseFloat(currentline[9]);
            result.push(obj);
          }
      }
    }
  }
};

  setdata(data,countrieslist);

  var plotdata={
    "Continent_List_DATA":result
  }
  //  console.log(JSON.stringify(result,null,4)); //JSON

   fs.writeFile("../json/continentlist.json", JSON.stringify(plotdata, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to continentlist.json");
    }
});
