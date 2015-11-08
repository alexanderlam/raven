var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var barChartData = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
	{
		fillColor : "rgba(220,220,220,0.5)",
		strokeColor : "rgba(220,220,220,0.8)",
		highlightFill: "rgba(220,220,220,0.75)",
		highlightStroke: "rgba(220,220,220,1)",
		data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
	},
	{
		fillColor : "rgba(151,187,205,0.5)",
		strokeColor : "rgba(151,187,205,0.8)",
		highlightFill : "rgba(151,187,205,0.75)",
		highlightStroke : "rgba(151,187,205,1)",
		data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
	}
	]
}

/*var countries= document.getElementById("countries").getContext("2d");
        new Chart(countries).Pie(pieData);*/
$("#emotions").click(function() {
	var canvas_bar = document.getElementById("canvas_bar").getContext("2d");
	new Chart(canvas_bar).Bar(barChartData);
}

	//window.myBar = new Chart(document.getElementById("canvas_bar").getContext("2d")).Bar(barChartData);

