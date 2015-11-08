$(document).ready(function() {

//var d = new Date(dateString);
/*var barChartData = {
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
		}]
	}*/


	var load = 0;






	var text = JSON.stringify([{  
		"message":"I think I am becoming an atheist tonight",
		"created":"2015-11-08T00:55:01+0000",
		"indico":{  
			"dieting":0.0023664630419026125,
			"drugs":0.0032440226355381655,
			"beer":0.0024720520070090945,
			"personal":0.006068045526164255,
			"romance":0.002041935844854507,
			"relationships":0.0019704646296144304,
			"atheism":0.2296987254561555,
			"nostalgia":0.001713157154439114,
			"lgbt":0.008621945711762337,
			"wine":0.0031130821473919507
		}
	},
	{  
		"message":"I need to die",
		"created":"2015-11-08T00:54:51+0000",
		"indico":{  
			"dieting":0.004345373872869754,
			"drugs":0.02003739824289553,
			"beer":0.004885592680382496,
			"personal":0.014601436640301807,
			"romance":0.0039096284904883635,
			"relationships":0.0029867096124156015,
			"atheism":0.021921108826787793,
			"nostalgia":0.002267567973274216,
			"lgbt":0.005117771879986786,
			"wine":0.0027693711538489068
		}
	},
	{  
		"message":"I love that crack and meth",
		"created":"2015-11-08T00:54:46+0000",
		"indico":{  
			"dieting":0.00853217415747198,
			"drugs":0.11717197706309135,
			"beer":0.009314444263107062,
			"personal":0.007533623978209127,
			"romance":0.007495016448779212,
			"relationships":0.004397000213949794,
			"atheism":0.0059552178297946155,
			"nostalgia":0.00618587963672549,
			"lgbt":0.009445884762764077,
			"wine":0.009415523246203027
		}
	}]);

var fontSizes = [100, 85, 70, 50, 40, 32, 24, 18];
var indicoArray = JSON.parse(text);
var topics = ["dieting", "drugs", "wine", "beer", "nostalgia", "personal", "romance", "relationships", "atheism", "lgbt"];

/*<h3 id = "warning-sign-topic"></h3>
                        <p id = "warning-sign-post"></p>
                        <h4 id = "warning-sign-date"></h4>*/

                        for (var i = 0; i < 5; i++) {
                        	if (typeof indicoArray[i] !== 'undefined') {
                        		var myDiv = document.getElementById("warning-sign-cell");
                        		var divClone = myDiv.cloneNode(true);
                        		document.getElementById("warning-sign").appendChild(divClone);
                        		var topic = [topics[Math.floor((Math.random() * 10))]];
                        		divClone.innerHTML = "<h3 id = 'warning-sign-topic'>" + topic + ": " + indicoArray[i].indico[topic] + "</h3><p id = 'warning-sign-post'>" + indicoArray[i].message +"</p><h4 id = 'warning-sign-date'>" + indicoArray[i].created + "</h4>";
                        	}
                        }

                        var myDiv = document.getElementById("warning-sign-cell");
                        var divClone = myDiv.cloneNode(true);
                        document.getElementById("warning-sign").appendChild(divClone);


                        var countDict = [["dieting",0, 0], ["drugs",0,0], ["beer",0, 0], ["personal",0,0], ["romance",0, 0], ["relationships",0,0], ["atheism",0,0], ["nostalgia",0,0], ["lgbt",0,0], ["wine",0,0]];
                        for (var i = 0; i <= indicoArray.length - 1; i++) {
                        	countDict[0][1] += indicoArray[i].indico.dieting;
                        	countDict[1][1] += indicoArray[i].indico.drugs;
                        	countDict[2][1] += indicoArray[i].indico.beer;
                        	countDict[3][1] += indicoArray[i].indico.personal;
                        	countDict[4][1] += indicoArray[i].indico.romance;
                        	countDict[5][1] += indicoArray[i].indico.relationships;
                        	countDict[6][1] += indicoArray[i].indico.atheism;
                        	countDict[7][1] += indicoArray[i].indico.nostalgia;
                        	countDict[8][1] += indicoArray[i].indico.lgbt;
                        	countDict[9][1] += indicoArray[i].indico.wine;
                        }

                        var maximum = 0;
                        for (var i = 0; i < 10; i++) {
                        	if (countDict[i][1] > maximum) {
                        		maximum = countDict[i][1];
                        	}
                        }

                        var worldCloudList = [];

                        for (var i = 0; i < 10; i++) {
                        	var percentMax = (countDict[i][1] / maximum) * 100;

                        	if (percentMax > 95) {
                        		worldCloudList.push([countDict[i][0], fontSizes[0]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[2]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[2]]);
                        	} else if (percentMax > 85) {
                        		worldCloudList.push([countDict[i][0], fontSizes[1]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[2]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        	} else if (percentMax > 70) {
                        		worldCloudList.push([countDict[i][0], fontSizes[2]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[4]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[4]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[4]]);
                        	} else if (percentMax > 50) {
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[4]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[4]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[5]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[5]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[5]]);
                        	} else if (percentMax > 30) {
                        		worldCloudList.push([countDict[i][0], fontSizes[4]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[5]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[5]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[6]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[6]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[6]]);
                        	} else {
                        		worldCloudList.push([countDict[i][0], fontSizes[5]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[6]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[6]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[7]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[7]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[7]]);
                        	}
                        }

                        WordCloud(document.getElementById('d3-holder-3'), { list: worldCloudList } );




                        $("#choose-type-1").click(function() {
                        	$(this).css('background-color', 'rgba(255,255,255,.4)');
                        	$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
                        	$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
                        	if (document.getElementById("choice-1").innerHTML === "Posts") {
                        		$('#d3-holder-2').addClass('hidden');
                        		$('#d3-holder-4').addClass('hidden');
                        		$('#d3-holder-1').addClass('hidden');
                        		$('#d3-holder-5').addClass('hidden');
                        		$('#d3-holder-6').addClass('hidden');
                        		$('#sentiment-analysis-variance').addClass('hidden');
                        		$('#sentiment-analysis').addClass('hidden');
                        		$('#warning-sign').removeClass('hidden');
                        		$('#d3-holder-3').removeClass('hidden');
                        	} else if (document.getElementById("choice-1").innerHTML === "Analysis") {
                        		$('#d3-holder-2').addClass('hidden');
                        		$('#d3-holder-3').addClass('hidden');
                        		$('#d3-holder-5').addClass('hidden');
                        		$('#d3-holder-1').addClass('hidden');
                        		$('#d3-holder-6').addClass('hidden');
                        		$('#sentiment-analysis').addClass('hidden');
                        		$('#warning-sign').addClass('hidden');
                        		$('#sentiment-analysis-variance').addClass('hidden');
                        		$('#d3-holder-4').removeClass('hidden');
                        	}
                        	else if (document.getElementById("choice-1").innerHTML === "Topics") {
             
                        		$('#d3-holder-3').addClass('hidden');
                        		$('#d3-holder-5').addClass('hidden');
                        		$('#d3-holder-1').addClass('hidden');
                        		$('#d3-holder-6').addClass('hidden');
								$('#warning-sign').addClass('hidden');
                        		$('#sentiment-analysis-variance').addClass('hidden');
                        		$('#d3-holder-4').addClass('hidden');
                        		$('#d3-holder-2').removeClass('hidden');
                        		$('#sentiment-analysis').removeClass('hidden');
                        	}
                        });

var sentimentText = JSON.stringify([{  
		"message":"I think I'm becoming an atheist tonight",
		"created":"2015-11-08T00:55:01+0000",
		"indico":0.5165563225746155
	},
	{  
		"message":"I need to die",
		"created":"2015-11-08T00:54:51+0000",
		"indico":0.391457736492157
	},
	{  
		"message":"I love that crack and meth",
		"created":"2015-11-08T00:54:46+0000",
		"indico":0.9546283483505249
	}]);
	var labels = [];
	var data = [];
	var sentimentArray = JSON.parse(sentimentText);

$("#choose-type-2").click(function() {
	$(this).css('background-color', 'rgba(255,255,255,.4)');
	$("#choose-type-1").css('background-color', 'rgba(255,255,255,0)');
	$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
	if (document.getElementById("choice-2").innerHTML === "Diagnosis") {
		$('#d3-holder-1').addClass('hidden');
		$('#d3-holder-2').addClass('hidden');
		$('#d3-holder-4').addClass('hidden');
		$('#d3-holder-3').addClass('hidden');
		$('#d3-holder-6').addClass('hidden');
		$('#sentiment-analysis').addClass('hidden');
		$('#warning-sign').addClass('hidden');
		$('#sentiment-analysis-variance').addClass('hidden');
		$('#d3-holder-5').removeClass('hidden');
		var radarChartData = {
			labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
			datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65,59,90,81,56,55,40]
			},
			{
				label: "My Second dataset",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [28,48,40,19,96,27,100]
			}
			]
		};

		var radar_chart = document.getElementById("canvas_radar").getContext("2d");
		new Chart(radar_chart).Radar(radarChartData);

	}
	else if (document.getElementById("choice-2").innerHTML !== "Variance"){
		$('#d3-holder-2').addClass('hidden');
		$('#d3-holder-3').addClass('hidden');
		$('#d3-holder-4').addClass('hidden');
		$('#d3-holder-5').addClass('hidden');
		$('#d3-holder-6').addClass('hidden');
		$('#sentiment-analysis-variance').addClass('hidden');
		$('#sentiment-analysis').addClass('hidden');
		$('#warning-sign').removeClass('hidden'); //!!!!
		$('#d3-holder-1').removeClass('hidden');
	} else {
		$('#d3-holder-2').addClass('hidden');
		$('#d3-holder-3').addClass('hidden');
		$('#d3-holder-4').addClass('hidden');
		$('#d3-holder-5').addClass('hidden');
		$('#d3-holder-1').addClass('hidden');
		$('#sentiment-analysis').addClass('hidden');
		$('#warning-sign').addClass('hidden');
		$('#sentiment-analysis-variance').removeClass('hidden');
		$('#d3-holder-6').removeClass('hidden');

		var positive = 0;
		var negative = 0;
		for (var i = 0; i < sentimentArray.length; i++) {
			if (sentimentArray[i].indico > .5) {
				positive += 1;
			}
			else {
				negative += 1;
			}
		}

		var pieData = [
    	{
        value: negative,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Negative"
    	},
    	{
        value: positive,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Positive"
    	}
	]

		var pie_chart = document.getElementById("canvas_pie").getContext("2d");
		new Chart(pie_chart).Pie(pieData);

		document.getElementById("sentiment-variance-cell-score").innerHTML = "This patient has " +positive+ " positive posts and " +negative+ " negative posts.<br>Overall, this amounts to " +Math.floor(positive/(positive+negative) * 100)+"% positive posts and " + Math.floor(negative/(positive+negative) * 100)+ "% negative posts.";
	}
});

$("#choose-type-3").click(function() {
	$(this).css('background-color', 'rgba(255,255,255,.4)');
	$("#choose-type-1").css('background-color', 'rgba(255,255,255,0)');
	$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
});

$("#word-usage").click(function() {
	document.getElementById("choice-1").innerHTML = "Posts";
	document.getElementById("choice-2").innerHTML = "Likes";
	document.getElementById("choice-3").innerHTML = "";
	$("#choose-type-1").css('background-color', 'rgba(255,255,255,0.4)');
	$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
	$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
	$('#d3-holder-1').addClass('hidden');
	$('#d3-holder-2').addClass('hidden');
	$('#d3-holder-4').addClass('hidden');
	$('#d3-holder-5').addClass('hidden');
	$('#d3-holder-6').addClass('hidden');
	$('#sentiment-analysis-variance').addClass('hidden');
	$('#sentiment-analysis').addClass('hidden');
	$('#warning-sign').removeClass('hidden');
	$('#d3-holder-3').removeClass('hidden');
});


$("#emotions").click(function() {
	document.getElementById("choice-1").innerHTML = "Topics";
	document.getElementById("choice-2").innerHTML = "Variance";
	document.getElementById("choice-3").innerHTML = "";
	$("#choose-type-1").css('background-color', 'rgba(255,255,255,0.4)');
	$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
	$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
	$('#d3-holder-1').addClass('hidden');
	$('#d3-holder-3').addClass('hidden');
	$('#d3-holder-4').addClass('hidden');
	$('#d3-holder-5').addClass('hidden');
	$('#d3-holder-6').addClass('hidden');
	$('#warning-sign').addClass('hidden');
	$('#sentiment-analysis-variance').addClass('hidden');
	$('#sentiment-analysis').removeClass('hidden');
	$('#d3-holder-2').removeClass('hidden');

	if (!load) {
	for (var i = 0; i < sentimentArray.length; i++) {
		if (sentimentArray[i].message !== null) {
			console.log(sentimentArray[i].created);
			var d = new Date(sentimentArray[i].created);
			var dateString = d.getMonth() + "/" + d.getDate() + ", " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
			labels.push(dateString);
			data.push(sentimentArray[i].indico);
		}
	}

	for (var i = 0; i < 5; i++) {
        if (typeof sentimentArray[i] !== 'undefined') {
			var myDiv = document.getElementById("sentiment-cell");
			var divClone = myDiv.cloneNode(true);
			document.getElementById("sentiment-analysis").appendChild(divClone);
			divClone.innerHTML = "<h3 id = 'sentiment-cell-score'>" + sentimentArray[i].indico + "</h3><p id = 'sentiment-cell-post'>" + sentimentArray[i].message + "</p><h4 id = 'sentiment-cell-date'>" + sentimentArray[i].created + "</h4>";
        }
	}

	var barChartData = {
		labels : labels,
		datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,0.8)",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data : data
		}]
	}

	var canvas_bar = document.getElementById("canvas_bar").getContext("2d");
	new Chart(canvas_bar).Bar(barChartData);
	load = 1;
}

});


$("#overall-analysis").click(function() {
	document.getElementById("choice-1").innerHTML = "Analysis";
	document.getElementById("choice-2").innerHTML = "Diagnosis";
	document.getElementById("choice-3").innerHTML = "Explanation";
	$("#choose-type-1").css('background-color', 'rgba(255,255,255,0.4)');
	$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
	$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
	$('#d3-holder-2').addClass('hidden');
	$('#d3-holder-3').addClass('hidden');
	$('#d3-holder-1').addClass('hidden');
	$('#d3-holder-5').addClass('hidden');
	$('#warning-sign').addClass('hidden');
	$('#d3-holder-6').addClass('hidden');
	$('#sentiment-analysis').addClass('hidden');
	$('#sentiment-analysis-variance').addClass('hidden');
	$('#d3-holder-4').removeClass('hidden');
});

var context = [
{ 'name': 'Andrew Carnegie', 'start': 1835, 'end': 1919 },
{ 'name': 'Sarah Hewitt', 'start': 1858, 'end': 1930 },
{ 'name': 'Eleanor Hewitt', 'start': 1864, 'end': 1924 },
{ 'name': 'Cooper Union', 'start': 1897, 'end': 1967  },
{ 'name': 'Carnegie mansion', 'start': 1903, 'end': 0 },
{ 'name': 'Smithsonian', 'start': 1976, 'end': 0 },
{ 'name': 'CHNDM', 'start': 1994, 'end': 0 },
{ 'name': 'Renovations', 'start': 2011, 'end': 2014 },
{ 'name': 'Re-opening', 'start': 2014, 'end': 0 },
];
var event = {
	'start': 1955,
	'end': 1975,
	'echo': 1971,
	'echo_prefix': 'acquired',
	'start_prefix': 'start',
	'end_prefix': '',
};

var tl = new timeline("timeline", context);		
tl.draw(event);
	// $(window).resize(function(){
	// 	tl.redraw();
	// });
});