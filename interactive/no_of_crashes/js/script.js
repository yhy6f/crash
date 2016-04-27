var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// x = d3.time.scale()
//   .range([0, width])
 
// y = d3.scale.linear()
//   .range([height, 0])
 
// color = d3.scale.category10()
 
// // # area generator to create the
// // # polygons that make up the
// // # charts
// area = d3.svg.area()
//     .interpolate("basis")
//     .x((d) -> x(d.year))
 
// // # line generator to be used
// // # for the Area Chart edges
// line = d3.svg.line()
//     .interpolate("basis")
//     .x((d) -> x(d.year))
 
// // ##stack layout for streamgraph
// // ## and stacked area chart
// stack = d3.layout.stack()
//   .values((d) -> d.values)
//   .x((d) -> d.year)
//   .y((d) -> d.count)
//   .out((d,y0,y) -> d.count0 = y0)
//   .order("reverse")

// $ ->
//   d3.json("no_of_crashes.json", display)


// display = (error, data) ->
//   // # a quick way to manually select which calls to display.
//   // # feel free to pick other keys and explore the less frequent call types.
//   // filterer = {"Heating": 1, "Damaged tree": 1, "Noise": 1, "Traffic signal condition": 1, "General construction":1, "Street light condition":1}
 
//   // data = rawData.filter((d) -> filterer[d.key] == 1)
 
//   // # a parser to convert our date string into a JS time object.
//   parseTime = d3.time.format.utc("%Y").parse
 
//   // # go through each data entry and set its
//   // # date and count property
//   data.forEach (s) ->
//     s.values.forEach (d) ->
//       d.year = parseTime(d.year)
//       d.count = parseFloat(d.count)
 
//     // # precompute the largest count value for each request type
//     s.maxCount = d3.max(s.values, (d) -> d.count)
//     print s.maxCount 
// //   data.sort((a,b) -> b.maxCount - a.maxCount)
 
// //   start()

// // start = () ->
// //   // # x domain setup
// //   minYear = d3.min(data, (d) -> d.values[0].year)
// //   maxYear = d3.max(data, (d) -> d.values[d.values.length - 1].year)
// //   x.domain([minDate, maxDate])
 
// //   // # I want the starting chart to emanate from the
// //   // # middle of the display.
// //   area.y0(height / 2)
// //     .y1(height / 2)
 
// //   // # now we bind our data to create
// //   // # a new group for each request type
// //   g = svg.selectAll(".request")
// //     .data(data)
// //     .enter()
 
// //   requests = g.append("g")
// //     .attr("class", "request")
 
// //   // # add some paths that will
// //   // # be used to display the lines and
// //   // # areas that make up the charts
// //   requests.append("path")
// //     .attr("class", "area")
// //     .style("fill", (d) -> color(d.key))
// //     .attr("d", (d) -> area(d.values))
 
// //   requests.append("path")
// //     .attr("class", "line")
// //     .style("stroke-opacity", 1e-6)
 
// //   // # default to streamgraph display
// //   streamgraph()


// // -----------------------------------------------------------------------------------
var parseDate = d3.time.format("%y").parse;
    // formatPercent = d3.format(".0%");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    // .tickFormat(formatPercent);

var area = d3.svg.area()
    .x(function(d) { return x(d.year); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var stack = d3.layout.stack()
    .values(function(d) { return d.values; });

var svg = d3.select(" body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("no_of_crashes.tsv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

  data.forEach(function(d) {
    d.year = parseDate(d.year);
  });

  var types = stack(color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        // return {date: d.date, y: d[name] / 100};
        return {year: d.year, y: d[name]};
      })
    };
  }));

  x.domain(d3.extent(data, function(d) { return d.year; }));

  var type = svg.selectAll(".type")
      .data(types)
    .enter().append("g")
      .attr("class", "type");

  type.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d) { return color(d.name); });

  type.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
      .attr("x", -6)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
});