var margin={top:20,right:10,bottom:100,left:75}

var w = 1000-margin.right-margin.left;
var h = 600-margin.top-margin.bottom;

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, w], 0.10,0.0);

var yScale = d3.scale.linear()
    .range([h, 0]);

var xaxis=d3.svg.axis()
        .scale(xScale)
        .orient("bottom"); //getting countries at bottom example:china india

var yaxis=d3.svg.axis()
        .scale(yScale)
        .orient("left");
    
 /*json data to plot  */
 d3.json("../json/populationdata.json",function(json){

   var data=json.Population_DATA;
   var svg = d3.select(".population-plot")
     .append("svg")
     .attr("width", w + margin.right+ margin.left)
     .attr("height", h + margin.top+ margin.bottom)
     .append("g") // https://gist.github.com/mbostock/3019563
     .attr("transform","translate("+margin.left+','+margin.right+")");

     data.sort(function (a, b) {
         return b.population - a.population;
     });

     xScale.domain(data.map(function(d){return d.country_name;})); // country name on x-axis
     yScale.domain([0, d3.max(data, function(d) {return d.population;})]); // gdp value on y-axis

      svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("height",0)
      .attr("y",h)
      .attr("x", function(d, i) {
      return xScale(d.country_name);
      })
      .attr("y", function(d) {
      return yScale(d.population);
      })
      .attr("width", xScale.rangeBand())
      .attr("height", function(d) {
      return h-yScale(d.population);
      })
      .attr("fill", "lightblue"); //graph lo bar color change 
  
     svg.append("g")
         .attr("class","x axis")
         .attr("transform","translate(0,"+ h +")")
         .call(xaxis)
         .selectAll("text")
         .attr("transform","rotate(-80)")
         .attr("dx","-.8em")
         .attr("dy",".25em")
         .style("text-anchor","end");
		 // .text("Countries");

     svg.append("g")
         .attr("class","y axis")
         .call(yaxis)
         .append("text")
		 .attr("transform", "rotate(-90)")
		 .attr("dx","-6em")
		 .attr("dy", "-4em")
		 .style("text-anchor", "end")
		 .text("Population in Millions");
 });

    