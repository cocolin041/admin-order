var cost = [
  {x: 0, y: 500},
  {x: 1, y: 600},
  {x: 2, y: 2500},
  {x: 3, y: 3000},
  {x: 4, y: 2500},
  {x: 5, y: 500},
  {x: 6, y: 1000},
  {x: 7, y: 2000}
]
var income = [
  {x: 0, y: 6000},
  {x: 1, y: 5000},
  {x: 2, y: 2000},
  {x: 3, y: 4000},
  {x: 4, y: 3800},
  {x: 5, y: 5000},
  {x: 6, y: 6500},
  {x: 7, y: 5000}
]
var revenue = [
  {x: 0, y: 7200},
  {x: 1, y: 7000},
  {x: 2, y: 5500},
  {x: 3, y: 7200},
  {x: 4, y: 5900},
  {x: 5, y: 6100},
  {x: 6, y: 7500},
  {x: 7, y: 7400} 
]

//measure margin and height, width, in order to set the scale range
var svg_width = 1100;
var svg_height = 406;
var path_margin = {'top': 104, 'right': 64, 'bottom': 85, 'left': 137}
//calculate min and max of all data, in order to set the scale domain
var cost_income_revenue = cost.concat(income).concat(revenue);
var maxX_all = d3.max(cost_income_revenue, function(d){ return d.x})
var minX_all = d3.min(cost_income_revenue, function(d){ return d.x})
var maxY_all = d3.max(cost_income_revenue, function(d){ return d.y})
var minY_all = d3.min(cost_income_revenue, function(d){ return d.y})

//define scale
var scaleX = d3.scale.linear()
                     .range([path_margin.left, svg_width - path_margin.right])  //x range(width)
                     .domain([minX_all, maxX_all])  //use min and max of all data
var scaleY = d3.scale.linear()
                     .range([path_margin.top, svg_height - path_margin.bottom])  //y range(height)
                     .domain([8000 - maxY_all, 8000 - minY_all])  //same here

//add svg to activity-curve div
var svg = d3.select("div.activity-curve")
            .append('svg')
            .attr({
              'height': svg_height,
              'width': svg_width
            })
//define line function                          
var line = d3.svg.line()
                  .x(function(d){
                    return scaleX(d.x)
                  })
                  .y(function(d){
                    return scaleY(8000 - d.y)
                  })
//append path to svg
svg.append('path')
   .attr({
     'd': line(cost),
     'fill': 'none',
     'stroke': '#D0021B',
     'stroke-width': '2px'
   })
svg.append('path')
   .attr({
     'd': line(income),
     'fill': 'none',
     'stroke': '#4A90E2',
     'stroke-width': '2px'
   })
svg.append('path')
    .attr({
      'd': line(revenue),
      'fill': 'none',
      'stroke': '#7ED321',
      'stroke-width': '2px'
    })