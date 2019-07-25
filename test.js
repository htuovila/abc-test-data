<!DOCTYPE html>
<meta charset="utf-8">

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v4.js"></script>

<!-- Create a div where the graph will take place -->
<div id="my_dataviz"></div>

<script>

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/htuovila/abc-test-data/master/Data_001.csv", function(data) {

function getJsDateFromExcel(excelDate) {
    var dateTemp = new Date((excelDate - (25567 + 1))*86400*1000);
    hours=dateTemp.getUTCHours();
    minutes=dateTemp.getUTCMinutes();
    var hoursAndMins=hours+minutes/60;
	return hoursAndMins;
}

// Transform time
//xvar d.time = getJsDateFromExcel(d.Time)

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 24])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 20])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
    
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "#69b3a2")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(getJsDateFromExcel(d.Time)) })
    .y(function(d) { return y(d.SIBT) })
    )

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(getJsDateFromExcel(d.Time)); } )
      .attr("cy", function (d) { return y(d.SIBT); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")
      
 // add labels
   svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Time");
      
      
        // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
        // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("SIBT");      


})

</script>
