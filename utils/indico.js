var indico = require('indico.io');
indico.apiKey = process.env.INDICO_KEY;

var wordsWeWant = [
	'diet',
	'drugs',
	'alcohol',
	'personal',
	'romance',
	'relationships',
	'atheism',
	'nostalgia',
	'lgbt'
]

var keywords = function(posts, callback){
	var list = [];
	for (var i = 0; i < posts.length; i++){
		if(posts[i].message){
			indico.keywords(posts[i].message)
			.then(function(res) {
				list.push(res);

				if(i === posts.length){
					console.log();
					callback(list);
				}
			}).catch(function(err) {
				console.warn(err);
			});
		}
	}
}

var texttags = function(count, text, callback, list){
	if(count === text.length){
		callback(list);
	}
	else{
		if(text[count])
		indico.textTags(text[count])
		.then(function(res) {
			console.log(res);
		}).catch(function(err) {
			console.warn(err);
		});
	}
}

var entry = function(text, analyze, callback){
	var list = [];

	analyze(0, text, callbackm list);
}

module.exports = {
	keywords: keywords
}