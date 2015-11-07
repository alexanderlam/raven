$(document).ready(function() {
	$("#choose-type-1").click(function() {
		$(this).css('background-color', 'rgba(255,255,255,.4)');
		$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
		$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
	});

	$("#choose-type-2").click(function() {
		$(this).css('background-color', 'rgba(255,255,255,.4)');
		$("#choose-type-1").css('background-color', 'rgba(255,255,255,0)');
		$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
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
		$('#d3-holder-3').removeClass('hidden');
	});

	$("#emotions").click(function() {
		document.getElementById("choice-1").innerHTML = "Positive";
		document.getElementById("choice-2").innerHTML = "Negative";
		document.getElementById("choice-3").innerHTML = "";
		$("#choose-type-1").css('background-color', 'rgba(255,255,255,0.4)');
		$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
		$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
		$('#d3-holder-1').addClass('hidden');
		$('#d3-holder-3').addClass('hidden');
		$('#d3-holder-2').removeClass('hidden');

	});

	$("#relationships").click(function() {
		document.getElementById("choice-1").innerHTML = "History";
		document.getElementById("choice-2").innerHTML = "";
		document.getElementById("choice-3").innerHTML = "";
		$("#choose-type-1").css('background-color', 'rgba(255,255,255,0.4)');
		$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
		$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
		$('#d3-holder-2').addClass('hidden');
		$('#d3-holder-3').addClass('hidden');
		$('#d3-holder-1').removeClass('hidden');
	});

	$("#overall-analysis").click(function() {
		document.getElementById("choice-1").innerHTML = "Analysis";
		document.getElementById("choice-2").innerHTML = "Diagnosis";
		document.getElementById("choice-3").innerHTML = "Explanation";
		$("#choose-type-1").css('background-color', 'rgba(255,255,255,0.4)');
		$("#choose-type-2").css('background-color', 'rgba(255,255,255,0)');
		$("#choose-type-3").css('background-color', 'rgba(255,255,255,0)');
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