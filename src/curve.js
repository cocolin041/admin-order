var cost = [
  {x: 0, y: 500, date: '2018-06-06'},
  {x: 1, y: 600, date: '2018-06-07'},
  {x: 2, y: 2500, date: '2018-06-08'},
  {x: 3, y: 3000, date: '2018-06-09'},
  {x: 4, y: 2500, date: '2018-06-10'},
  {x: 5, y: 500, date: '2018-06-11'},
  {x: 6, y: 1000, date: '2018-06-12'},
  {x: 7, y: 2000, date: '2018-06-13'}
]
var income = [
  {x: 0, y: 6000, date: '2018-06-06'},
  {x: 1, y: 5000, date: '2018-06-07'},
  {x: 2, y: 2000, date: '2018-06-08'},
  {x: 3, y: 4000, date: '2018-06-09'},
  {x: 4, y: 3800, date: '2018-06-10'},
  {x: 5, y: 5000, date: '2018-06-11'},
  {x: 6, y: 6500, date: '2018-06-12'},
  {x: 7, y: 5000, date: '2018-06-13'}
]
var revenue = [
  {x: 0, y: 7200, date: '2018-06-06'},
  {x: 1, y: 7000, date: '2018-06-07'},
  {x: 2, y: 5500, date: '2018-06-08'},
  {x: 3, y: 7200, date: '2018-06-09'},
  {x: 4, y: 5900, date: '2018-06-10'},
  {x: 5, y: 6100, date: '2018-06-11'},
  {x: 6, y: 7500, date: '2018-06-12'},
  {x: 7, y: 7400, date: '2018-06-13'} 
]
var customTimeFormat = function(d){ return d3.time.format("%e")(d) + ' ' + d3.time.format("%b")(d)}

//measure margin and height, width, in order to set the scale range
var svg_width = 1100;
var svg_height = 406;
var path_margin = {'top': 104, 'right': 64, 'bottom': 85, 'left': 137}
//calculate min and max of all data, in order to set the scale domain
var cost_income_revenue = cost.concat(income).concat(revenue);
var maxDate_all = d3.max(cost_income_revenue, function(d){ return d.date})
var minDate_all = d3.min(cost_income_revenue, function(d){ return d.date})
var maxY_all = d3.max(cost_income_revenue, function(d){ return d.y})
var minY_all = d3.min(cost_income_revenue, function(d){ return d.y})

//define scale
var scaleX_date = d3.time.scale()
                    .range([0, svg_width - path_margin.right])  //x range(width)
                    .domain([new Date('2018-06-05'), new Date(maxDate_all)])
var scaleX = d3.scale.linear()
                    .range([path_margin.left, svg_width - path_margin.right])  //x range(width)
                    .domain([0, cost.length - 1])  //use min and max of all data
var scaleY = d3.scale.linear()
                    .range([path_margin.top, svg_height - path_margin.bottom])  //y range(height)
                    .domain([8000 - maxY_all, 8000 - minY_all])  //same here
var scaleY_axis = d3.scale.linear()
                    .range([path_margin.top, svg_height - path_margin.bottom])  //y range(height)
                    .domain([8000 - minY_all, 8000 - maxY_all])  //same here

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

//define axis
var axisX = d3.svg.axis()
                  .scale(scaleX_date)
                  .orient('bottom')
                  .ticks(cost.length)
                  .tickFormat(customTimeFormat)
var axisY = d3.svg.axis()
                  .scale(scaleY_axis)
                  .orient('left')
                  .ticks(cost.length)
                  .tickValues([0, 2000, 4000, 6000, 8000])
//define grid
var gridX = d3.svg.axis()
                  .scale(scaleY_axis)
                  .orient('left')
                  .ticks(cost.length + 1)
                  .tickValues([0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000])
                  .tickFormat('')
                  .tickSize(-950, 0)

//axis
svg.append('g')
   .call(axisX)
   .attr({
     'transform': 'translate(0, 340)',
     'fill': 'none'
   })
   .selectAll('text')
   .attr({
    'fill': '#9B9B9B',
    'stroke': 'none'
   })
   .style({
     'font-family': 'HelveticaNeue-Medium',
     'font-size': '16px'
   })
svg.append('g')
   .call(axisY)
   .attr({
     'transform': 'translate(100, 0)',
     'fill': 'none'
   })
   .selectAll('text')
   .attr({
     'fill': '#9B9B9B',
     'stroke': 'none'
   })
   .style({
     'font-family': 'HelveticaNeue-Medium',
     'font-size': '16px'
   })

//grid
svg.append('g')
   .call(gridX)
   .attr({
    'transform': 'translate(110, 0)'
   })
   .selectAll('line')
   .style({
    'stroke': '#EBEBEB'
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

//var d = new Date('2014,12,01,12:16:05');
//console.log(d3.time.format("%e")(d) + ' ' + d3.time.format("%b")(d));