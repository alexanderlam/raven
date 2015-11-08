	var bipolar = 0;
	var depression = 0;
	var substanceAbuse = 0;
	var insomnia = 0;
	var anxiety = 0;
	var insomnia = 0;
	var eatingDisorder = 0;
	var schizophrenia = 0;
	var npd = 0;
	var apd = 0;
	var bpd = 0;
	var ocd = 0;
	var ptsd = 0;

var reasons = [];

$(document).ready(function() {
	var load = 0;
var json;
var sentimentJson = "";
var indicoArray;
var sentimentArray;
var topics;
var labels = [];
		var data = [];
var tagsUrl = "https://yraven.herokuapp.com/graph/posts/tags?token=CAACEdEose0cBAIhqzpYYH3tY21hkMxIZAQQ0vXZB3knIuXIfeqdAyNZB1MlPMzV2a0HMSNvPTzd0yDmdeEjMr0aqfbZAweDiNqtrktDVmng2pgWcLiy4CVT74dzcGqgm3rpoZBAEZBQNuZAanZAirH2DD3cZAF0A1HlIYbV4eYShiBWFlH8mN0ZCn9Lzy953QhXMswSHXeDRDpCN3gTdAedl79&userId=10204568093938230";
var sentimentUrl = "https://yraven.herokuapp.com/graph/posts/sentiment?token=CAACEdEose0cBAIhqzpYYH3tY21hkMxIZAQQ0vXZB3knIuXIfeqdAyNZB1MlPMzV2a0HMSNvPTzd0yDmdeEjMr0aqfbZAweDiNqtrktDVmng2pgWcLiy4CVT74dzcGqgm3rpoZBAEZBQNuZAanZAirH2DD3cZAF0A1HlIYbV4eYShiBWFlH8mN0ZCn9Lzy953QhXMswSHXeDRDpCN3gTdAedl79&userId=10204568093938230";
    jQuery.ajax({
        type:"GET",
        url:tagsUrl,
        body:{
        },
        dataType:"json"
    }).done(
        function(data){
            loadJsonTags(data);
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        });

    jQuery.ajax({
        type:"GET",
        url:sentimentUrl,
        body:{
        },
        dataType:"json"
    }).done(
        function(data){

            loadJsonSentiment(data);
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        });

    function loadJsonTags(data) {
    	

	var text = JSON.stringify(data);

var fontSizes = [100, 85, 70, 50, 40, 32, 24, 18];
indicoArray = JSON.parse(text);
topics = ["dieting", "drugs", "wine", "beer", "nostalgia", "personal", "romance", "relationships", "atheism", "lgbt"];

					

						for (var k = 0; k < indicoArray.length; k++) {
							if (!indicoArray.message) {
								indicoArray.splice(k,1);
							}
						}

                        for (var i = 0; i < 3; i++) {
                        	if (typeof indicoArray[i] !== 'undefined') {
                        		var myDiv = document.getElementById("warning-sign-cell");
                        		var divClone = myDiv.cloneNode(true);
                        		document.getElementById("warning-sign").appendChild(divClone);
                        		var topic = [topics[Math.floor((Math.random() * 10))]];
                        		divClone.innerHTML = "<h3 id = 'warning-sign-topic'><b>" + topic + "</b>: Relevance rating of " + Math.floor(indicoArray[i].indico[topic] * 1000) + "</h3><p id = 'warning-sign-post'>'" + indicoArray[i].message +"'</p><h4 id = 'warning-sign-date'>- " + indicoArray[i].created + "</h4>";
                        	}
                        }

                        var myDiv = document.getElementById("warning-sign-cell");
                        var divClone = myDiv.cloneNode(true);
                        document.getElementById("warning-sign").appendChild(divClone);


                        var countDict = [["dieting",0, 0], ["drugs",0,0], ["beer",0, 0], ["personal",0,0], ["romance",0, 0], ["relationships",0,0], ["atheism",0,0], ["nostalgia",0,0], ["lgbt",0,0], ["wine",0,0]];
                        for (var i = 0; i <= indicoArray.length - 1; i++) {
                        	countDict[0][1] += indicoArray[i].indico.dieting;
                        	if (indicoArray[i].indico.dieting > .1) {
                        		eatingDisorder += 2;
                        		bpd += 1;
                        		anxiety += 1;
                        		depression += 1;
                        		reasons.push("The patient was found to display possible signs of an Eating Disorder, which is often in contention with Borderline Personality Disorder, Anxiety, and Depression due to the following post: " + indicoArray[i].message);
                        	}
                        	countDict[1][1] += indicoArray[i].indico.drugs;
                        	if (indicoArray[i].indico.drugs > .1 || indicoArray[i].indico.beer > .1 || indicoArray[i].indico.wine > .1) {
                        		substanceAbuse += 2;
                        		bipolar += 1;
                        		ptsd += 1;
                        		anxiety += 1;
                        		schizophrenia += 1;
                        		apd += 1;
                        		bpd += 1;
                        		reasons.push("The patient was found to display possible signs of an Substance Abuse, which is often in contention with Anxiety, Antisocial Personality Disorder, Borderline Personality Disorder, Bipolar Disorder, Post Traumatic Stress Disorder, Schizophrenia, and Depression due to the following post: " + indicoArray[i].message);
                        	}
                        	countDict[2][1] += indicoArray[i].indico.beer;
                        	countDict[3][1] += indicoArray[i].indico.personal;
                        	if (indicoArray[i].indico.personal > .1) {
                        		depression += 1;
                        		anxiety += 1;
                        		insomnia += 1;
                        		npd += 1;
                        		bpd += 1;
                        		reasons.push("The patient was found to display possible signs of self deprecation or self conceit, which is often in contention with Anxiety, Borderline Personality Disorder, Bipolar Disorder, Post Traumatic Stress Disorder, Narcissistic Personality Disorder and Depression due to the following post: " + indicoArray[i].message);

                        	}
                        	countDict[4][1] += indicoArray[i].indico.romance;
                        	if (indicoArray[i].indico.romance > .1 || indicoArray[i].indico.relationships > .1) {
                        		bpd += 1;
                        		depression += 1;
                        		bipolar += 1;
                        		npd += 1;
                        		reasons.push("The patient wasfound to display possible signs of inter-relationship problems, which is often in contention with Borderline Personality Disorder, Bipolar Disorder, Depression, and Narcissistic Personality Disorder due to the following post: " + indicoArray[i].message);

                        	}
                        	countDict[5][1] += indicoArray[i].indico.relationships;
                        	countDict[6][1] += indicoArray[i].indico.atheism;
                        	if (indicoArray[i].indico.atheism > .1) {
                        		apd += 1;
                        		ptsd += 1;
                        		reasons.push("The patient was found to display possible signs of an atheist lifestyle, which is often associated with Antisocial Personality Disorder or Post Traumatic Stress Disorder due to the following post: " + indicoArray[i].message);

                        	}
                        	countDict[7][1] += indicoArray[i].indico.nostalgia;
                        	if (indicoArray[i].indico.nostalgia > .1) {
                        		insomnia += 1;
                        		ptsd += 1;
                        		bpd += 1;
                        		depression += 1;
                        		reasons.push("The patient was found to display possible signs of nostalgia, which could signal problems with Insomnia, Post Traumatic Stress Disorder, Borderline Personality Disorder, and Depression due to the following post: " + indicoArray[i].message);
                        	}
                        	countDict[8][1] += indicoArray[i].indico.lgbt;
                        	if (indicoArray[i].indico.lgbt > .1) {
                        		depression += 1;
                        		reasons.push("The patient was found discussing a LGBT lifestyle (individuals who identify as LGTB have higher rates of depression) in the following post: " + indicoArray[i].message);
                        	}
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
                        		worldCloudList.push([countDict[i][0], fontSizes[4]]);
                    
                        	} else if (percentMax > 85) {
                        		worldCloudList.push([countDict[i][0], fontSizes[1]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[2]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[3]]);
                        	} else if (percentMax > 70) {
                        		worldCloudList.push([countDict[i][0], fontSizes[1]]);
                        		worldCloudList.push([countDict[i][0], fontSizes[2]]);
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


    }

    function loadJsonSentiment(data) {
    	var sentimentText = JSON.stringify(data);
		console.log(sentimentJson);
		sentimentArray = JSON.parse(sentimentText);
		var newsentimentArray = [];
		for (var k = 0; k < sentimentArray.length; k++) {
							if (sentimentArray[k].message) {
								newsentimentArray.push(sentimentArray[k]);
							}
						}
						console.log(newsentimentArray);
		sentimentArray = newsentimentArray;
		console.log(sentimentArray);
    }


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
		var radarChartDataOne = {
			labels: ["Anxiety", "APD", "Bipolar", "BPD", "Depression", "Eating Disorder"],
			datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [anxiety*10,apd*10,bipolar*10,bpd*10,depression*10,eatingDisorder*10]
			}]
		};

		var options = {
			pointLabelFontColor : "#fff"
		}

		var radarChartDataTwo = {
			labels: ["Insomnia", "NPD", "PTSD", "Schizophrenia", "Substance Abuse"],
			datasets: [
			{
				label: "My Second dataset",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [insomnia*10,npd*10,ptsd*10,schizophrenia*10,substanceAbuse*10]
			}]
		};

		var radar_chart = document.getElementById("canvas_radar").getContext("2d");
		new Chart(radar_chart).Radar(radarChartDataOne, options);
		var radar_chart = document.getElementById("canvas_radar2").getContext("2d");
		new Chart(radar_chart).Radar(radarChartDataTwo, options);

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
		document.getElementById("sentiment-variance-cell-score").innerHTML = "This patient has <font color ='#46BFBD'>" +positive+ " positive posts</font> and <font color='F7464A'>" +negative+ " negative posts</font>.<br><br>Overall, this amounts to <b>" +Math.floor(positive/(positive+negative) * 100)+"%</b> positive posts and <b>" + Math.floor(negative/(positive+negative) * 100)+ "%</b> negative posts.";
		var pie_chart = document.getElementById("canvas_pie").getContext("2d");
		new Chart(pie_chart).Pie(pieData);
		if (Math.floor(negative/(positive+negative) * 100) > 25) {
			depression += 1;
			bpd += 1;
            reasons.push("The patient was determined to be speaking in a negative way in the majority of their posts. Studies have shown engaging in negative conversations over social media can put patients in a bad mood, or continue any negative thoughts carried over from the physical world.");
		}
		if (Math.floor(positive/(positive+negative) * 100) > 40 && Math.floor(positive/(positive+negative) * 100) < 60) {
			depression += 1;
			bipolar += 2;
			anxiety += 1;
			bpd += 1;
            reasons.push("The patient was determined to be speaking in an inconsistent manner quite frequently, as denoted by the fact that roughly half of their positives are positive and negative. Such inconsistenties in mood may be a sign of Bipolar Disorder, or a related anger disorder. in the majority of their posts.");
		}
		else if (Math.floor(negative/(positive+negative) * 100) > 50) {
			depression += 1;
			bpd +=1;
			reasons.push("The patient was determined to be speaking in a negative way in the majority of their posts. This is a precautionary sign that an anger disorder may be in place.");
		}
		if (Math.floor(negative/(positive+negative) * 100) > 75) {
			depression += 1;
			schizophrenia += 1;
			apd += 1;
			anxiety += 1;
			bpd += 1;
			reasons.push("The patient was determined to be speaking in a negative way in the vast majority of their posts. Raven recommends that the patient be seen immediately for an evaulation.");
		} 
		if (Math.floor(positive/(positive+negative) * 100) > 90) {
			npd += 1;
			reasons.push("The patient was determined to be speaking in a positive way about themselves in the majority of their posts. Conceit on this level is often a sign of Narcissistic Personality Disorder");
		} 
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
			var d = new Date(sentimentArray[i].created);
			var dateString = d.getMonth() + "/" + d.getDate() + ", " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
			labels.push(dateString);
			data.push(sentimentArray[i].indico);
		}
	}

	for (var i = 0; i < 3; i++) {
        if (typeof sentimentArray[i] !== 'undefined') {
			var myDiv = document.getElementById("sentiment-cell");
			var divClone = myDiv.cloneNode(true);
			document.getElementById("sentiment-analysis").appendChild(divClone);
			divClone.innerHTML = "<h3 id = 'sentiment-cell-score'>Positivity score of: <b>" + Math.floor((sentimentArray[i].indico * 100)) + "%</b></h3><p id = 'sentiment-cell-post'>" + sentimentArray[i].message + "</p><h4 id = 'sentiment-cell-date'>- " + sentimentArray[i].created + "</h4>";
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
	$("#overall-analysis-text").removeClass('hidden');
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



});

var loading = false;

$("#overall-analysis").click(function() {
if (!loading) {
    var dataLeft = 
[{ "skill": "Anxiety", "progress": anxiety*10 }, 
{ "skill": "Antisocial Personality Disorder", "progress": apd*10 }, 
{ "skill": "Bipolar", "progress": bipolar*10 }, 
{ "skill": "Borderline Personality Disorder", "progress": bpd*10}, 
{ "skill": "Depression", "progress": depression*10 }, 
{ "skill": "Eating Disorder", "progress": eatingDisorder*10 }];

//Data for right div
var dataRight =  
[{"skill": "Insomnia", "progress": insomnia*10}, 
{"skill": "Narcissistic Personality Disorder", "progress": npd*10}, 
{"skill": "Post Traumatic Stress Disorder", "progress": ptsd*10},
{"skill": "Schizophrenia", "progress": schizophrenia*10}, 
{"skill": "Substance Abuse", "progress": substanceAbuse*10}];

anchorLeft = d3.select("#leftSkills");

//Bind data for left bars
var divLeft = anchorLeft.selectAll("#leftSkills div")
.data(dataLeft);

//Add shadow for the left bars
divLeft.enter().append("div")
.attr("class", "shadow");

anchorRight = d3.select("#rightSkills");

//Bind data for right bars
var divRight = anchorRight.selectAll("#rightSkills div")
.data(dataRight);

//Add shadow for the right bars
divRight.enter().append("div")
.attr("class", "shadow");

//Create the bars
d3.select("body").selectAll(".shadow")
.append("div")
.attr("class","bar");

//Create the path
d3.select("body").selectAll(".bar")
.append("div")
.attr("class","path");

//Add the pattern for the bars
d3.select("body").selectAll(".path")
.append("div")
.attr("class","pattern");

loadChart();

for (var i = 0; i < 3; i++) {
if (typeof reasons[i] !== 'undefined') {
			var myDiv = document.getElementById("overall-cell");
			var divClone = myDiv.cloneNode(true);
			document.getElementById("overall-analysis-text").appendChild(divClone);
			divClone.innerHTML = "<p>" + reasons[i] + "</p>";
        }
    }


loading = true;
}
});

//Animate the bars when they are both visible on screen
function loadChart(){

    var start_val = 0;

    //add the percentage to the progress bar and transition the number
    d3.select("body").selectAll(".pattern")
    .append("div")
    .text(start_val)
    .attr("class", "percentage")
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    .style("min-width", function(d, i) {
        return (d.progress*3)/2 + "px"; 
        console.log(1);
    })
    .tween(".percentage", function(d) {
        var i = d3.interpolate(this.textContent, d.progress),
        prec = (d.progress + "").split("."),
        round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

        return function(t) {
            this.textContent = Math.round(i(t) * round) / round + "%";
        };
    });

    //transition the width of the path
    d3.select("body").selectAll(".path")
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    .style("width", function(d, i) {
        return d.progress*3 + "px"; 
    });

    //transition between the different colors depending on the value
    d3.select("body").selectAll(".pattern")
    //transition to first color
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#608dbd";
        }
        else {
            return "#68838b";
        }
    })
    //transition to second color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 250;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d < 40) {
            return "#608dbd";
        }
        else if (d.progress < 60) {
            return "#68838b";
        }
        else {
            return "#9c9c9c";
        }
    })
    //transition to third color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 500;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#608dbd";
        }
        else if (d.progress < 60) {
            return "#68838b";
        }
        else if (d.progress < 80) {
            return "#9c9c9c";
        }
        else {
            return "#d6d6d6";
        }
    })
    //transition to fourth color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 750;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#608dbd";
        }
        else if (d.progress < 60) {
            return "#68838b";
        }
        else if (d.progress < 80) {
            return "#9c9c9c";
        }
        else  if (d.progress < 100) {
            return "#d6d6d6";
        }
        else {
            return "#ffffff";
        }
    });

    //transition the sadow under the progress bar
    d3.select("body").selectAll(".shadow")
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    .style("width", function(d, i) {
        return d.progress*3-6 + "px"; 
    });
}
