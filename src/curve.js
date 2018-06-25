var parseTime = d3.timeParse("%Y");

var svg = d3.select("svg");

var margin = {top: 30, right: 50, bottom: 30, left: 30},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    labelPadding = 3;

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
/*
var parseData = function(d) {
  for (i = 0; i < d.length; i++) {
    d[i].date = d[i].date.getFullYear()
    //d[i].date = d[i].date.getFullYear()
  }
  //for (var k in d) if (k !== "date") d[k] = +d[k];
  return d;
};
var data2 = parseData(data2);
*/

var errorData = function(data) {

  var series = data.map(function(key) {
    return data.map(function(d) {
      return {
        date: d.date,
        value: d.Apples
      };
    });
  });

  var x = d3.scaleTime()
      .domain([data[0].date, data[data.length - 1].date])
      .range([0, width]);

  var y = d3.scaleLinear()
      .domain([0, d3.max(series, function(s) { return d3.max(s, function(d) { return d.value; }); })])
      .range([height, 0]);

  var z = d3.scaleOrdinal(d3.schemeCategory10);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  var serie = g.selectAll(".serie")
      .data(series)
      .enter().append("g")
      .attr("class", "serie");

  serie.append("path")
      .attr("class", "line")
      .style("stroke", function(d) { return z(d[0].key); })
      .attr("d", d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.value); }));

  var label = serie.selectAll(".label")
      .data(function(d) { return d; })
      .enter().append("g")
      .attr("class", "label")
      .attr("transform", function(d, i) { return "translate(" + x(d.date) + "," + y(d.value) + ")"; });

  label.append("text")
      .attr("dy", ".35em")
      .text(function(d) { return d.value; })
      .filter(function(d, i) { return i === data.length - 1; })
      .append("tspan")
      .attr("class", "label-key")
      .text(function(d) { return " " + d.key; });

  label.append("text","rect")
      .datum(function() { return this.previousElementSibling.getBBox(); })
      .attr("x", function(d) { return d.x - labelPadding; })
      .attr("y", function(d) { return d.y - labelPadding; })
      .attr("width", function(d) { return d.width + 2 * labelPadding; })
      .attr("height", function(d) { return d.height + 2 * labelPadding; });
};
errorData(data2);