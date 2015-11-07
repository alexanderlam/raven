var margin = {top: 290, right: 360, bottom: 290, left: 360},
    radius = Math.min(margin.top, margin.right, margin.bottom, margin.left) - 10;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
    .range([0, radius]);

var color = d3.scale.ordinal()
    .domain(["foo", "bdo", "baz"])
    .range(colorbrewer.Spectral[8]);


var svg = d3.select("#chart").append("svg")
	.attr("width", '65%')
    .attr("height", '65%')
    .attr('viewBox','0 -50 '+Math.min(margin.left + margin.right, margin.top + margin.bottom)+' '+(50 + Math.min(margin.left + margin.right, margin.top + margin.bottom)))
    .attr('preserveAspectRatio','xMinYMin')
    .append("g")
	    .attr("id", "container")
    .attr("transform", "translate(" + Math.min(margin.left + margin.right, margin.top + margin.bottom) / 2 + "," + Math.min(margin.left + margin.right, margin.top + margin.bottom) / 2 + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
	// lw 3'erna al y(d.y) we 2smnaha 3la 2 he3'er al radius le al first level 
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });


d3.json("expanses.json", function(error, root) {

  // Compute the initial layout on the entire tree to sum sizes.
  // Also compute the full name and fill color for each node,
  // and stash the children so they can be restored as we descend.
  partition
      .value(function(d) { return d.size; })
      .nodes(root)
      .forEach(function(d) {
        d._children = d.children;
        d.sum = d.value;
      });
	    
  // Now redefine the value function to use the previously-computed sum.
  partition
      .children(function(d, depth) { return depth < 2 ? d._children : null; })
      .value(function(d) { return d.sum; });
	  
  var g = svg.selectAll("g")
      .data(partition.nodes(root))
      .enter().append("g");

  var path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
    .on("click", click)    
	.on("mouseover", function(d) {
        tooltip.show([d3.event.clientX,d3.event.clientY],'<div>'+d.name+'</div><div>'+d.value+'</div>')
	})
    .on('mouseout',function(){
            tooltip.cleanup()
    })   
    .each(stash);
	
	// Define the legeneds
	var legend = d3.select("#legend").append("svg")
	  .attr("class", "legend")
	  .attr("width", radius)
	  .attr("height", radius)
	  .selectAll("g")
	  .data(partition.nodes(root))
	  .enter().append("g")
	  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
	  .attr("width", 18)
	  .attr("height", 18)
	  .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
	  .on("click", click);
		
	legend.append("text")
	  .attr("x", 24)
	  .attr("y", 9)
	  .attr("dy", ".35em")
	  .text(function(d) { return d.name; });

	// Define Labels on the arcs
	var text = g.append("text")
	.attr("dy", ".35em") // vertical-align
	.attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
	.attr("x", function(d) { return y(d.y); })
	.attr("dx", "6") // margin
	.attr("display", 'block')
	.text(function(d) {
	return d.name;
	})
	.on("click", click);

	// Append a new white circle instead of the root circle ... I made this just to control the style
	var center = svg.append("circle")
      .attr("r", radius / 3)
	  .style("fill", "rgb(147,145,151)")
      .on("click", click);
	  
	center.append("title")
	  center.datum(root);  

  
  function click(d) {
    // fade out all text elements
    text.transition().attr("opacity", 0);

    path.transition()
      .duration(500)
      .attrTween("d", arcTween(d))
      .each("end", function(e, i) {
          // check if the animated element's data e lies within the visible angle span given in d
          if (e.x >= d.x && e.x < (d.x + d.dx)) {
            // get a selection of the associated text element
            var arcText = d3.select(this.parentNode).select("text");
            // fade in the text element and recalculate positions
            arcText.transition().duration(250)
              .attr("opacity", 1)
              .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
              .attr("x", function(d) { return y(d.y); });
          }
      });
  }
});

d3.select(self.frameElement).style("height", margin.top + margin.bottom + "px");

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y* radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {
  return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}

// Stash the old values for transition.
function stash(d) {
  d.x0 = d.x;
  d.dx0 = d.dx;
}
  
/*****
 * A no frills tooltip implementation.
 *****/

(function() {

  var tooltip = window.tooltip = {}

  tooltip.show = function(pos, content, gravity, dist, parentContainer, classes) {

    var container = d3.select('body').selectAll('.tooltip').data([1])

        container.enter().append('div').attr('class', 'tooltip ' + (classes ? classes : 'xy-tooltip'))

        container.html(content)

    gravity = gravity || 'n'
    dist = dist || 20

    var body = document.getElementsByTagName('body')[0]

    var height = parseInt(container[0][0].offsetHeight)
      , width = parseInt(container[0][0].offsetWidth)
      , windowWidth = window.innerWidth
      , windowHeight = window.innerHeight
      , scrollTop = body.scrollTop
      , scrollLeft = body.scrollLeft
      , left = 0
      , top = 0


    switch (gravity) {
      case 'e':
        left = pos[0] - width - dist
        top = pos[1] - (height / 2)
        if (left < scrollLeft) left = pos[0] + dist
        if (top < scrollTop) top = scrollTop + 5
        if (top + height > scrollTop + windowHeight) top = scrollTop - height - 5
        break
      case 'w':
        left = pos[0] + dist
        top = pos[1] - (height / 2)
        if (left + width > windowWidth) left = pos[0] - width - dist
        if (top < scrollTop) top = scrollTop + 5
        if (top + height > scrollTop + windowHeight) top = scrollTop - height - 5
        break
      case 's':
        left = pos[0] - (width / 2)
        top = pos[1] + dist
        if (left < scrollLeft) left = scrollLeft + 5
        if (left + width > windowWidth) left = windowWidth - width - 5
        if (top + height > scrollTop + windowHeight) top = pos[1] - height - dist
        break
      case 'n':
        left = pos[0] - (width / 2)
        top = pos[1] - height - dist
        if (left < scrollLeft) left = scrollLeft + 5
        if (left + width > windowWidth) left = windowWidth - width - 5
        if (scrollTop > top) top = pos[1] + 20
        break
    }


    container.style('left', left+'px')
    container.style('top', top+'px')

    return container
  }

  tooltip.cleanup = function() {
      // Find the tooltips, mark them for removal by this class (so other tooltip functions won't find it)
      var tooltips = d3.selectAll('.tooltip').attr('class','tooltip-pending-removal').transition().duration(250).style('opacity',0).remove()
	  var textMiddleClean = d3.selectAll('.textMiddle').transition().duration(250).style('opacity',0).remove()

  }
})()