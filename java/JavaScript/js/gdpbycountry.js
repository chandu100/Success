var margin={top:20,right:10,bottom:100,left:75}

var w = 1000-margin.right-margin.left;
var h = 600-margin.top-margin.bottom;

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, w], 0.07,0.2);

var yScale = d3.scale.linear()
    .range([h, 0]);

var xaxis=d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

var yaxis=d3.svg.axis()
        .scale(yScale)
        .orient("left");

 
/*json data */ 

d3.json("../json/gdpdata.json",function(json){

  var data=json.GDP_DATA;
  var svg = d3.select(".gdp-plot")
    .append("svg")
    .attr("width", w + margin.right+ margin.left)
    .attr("height", h + margin.top+ margin.bottom)
    .append("g")
    .attr("transform","translate("+margin.left+','+margin.right+")");

    var colorscale = d3.scale.linear()
                    .domain([0,d3.max(data, function(d) {return d.gdp;})])
                    .range(["red","green","lightblue"]);

    data.sort(function (a, b) {
        return b.gdp - a.gdp;
    });

    xScale.domain(data.map(function(d){return d.country_name;}));
    yScale.domain([0, d3.max(data, function(d) {return d.gdp;})]);


    svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("height",0)
     .attr("y",h)
     .transition().duration(1000)
     .delay(function(d,i){return i*20;})
     .attr("x", function(d, i) {
      return xScale(d.country_name);
     })
     .attr("y", function(d) {
      return yScale(d.gdp);
     })
     .attr("width", xScale.rangeBand())
     .attr("height", function(d) {
      return h-yScale(d.gdp);
     })
     .attr("fill", "white")
     .style("background","1px dotted black");
   
    svg.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0,"+ h +")")
        .call(xaxis)
        .selectAll("text")
        .attr("transform","rotate(-60)")
        .attr("dx","-.8em")
        .attr("dy",".25em")
        .style("text-anchor","end")

    svg.append("g")
        .attr("class","y axis")
        .call(yaxis)
        .append("text")
  .attr("transform", "rotate(-90)")
  .attr("dx","-6em")
  .attr("dy", "-4em")
  .style("text-anchor", "end")
  .text("GDP in Billion Dollars");
});

 