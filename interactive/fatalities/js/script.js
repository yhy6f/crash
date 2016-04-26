var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { 
      return x(d.year);
    })
    .y(function(d) { 
    	return y(d.no_of_fatalities); 
    });

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("fatalities.tsv", type, function(error, data) {
  if (error) throw error;
  console.log(data)
  x.domain(d3.extent(data, function(d) { 
      return d.year; 
}));

  y.domain(d3.extent(data, function(d) { 
      return d.no_of_fatalities; 
}));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of injuries");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

 });
function type(d) {
  d.year = formatDate.parse(d.year);
  d.no_of_fatalities = +d.no_of_fatalities;
  return d;
}







