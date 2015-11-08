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

var filterResponse = function(response, post){
	var newResponse = {
		message: post.message,
		created: post.created_time,
		indico: {
			dieting: response.dieting,
			drugs: response.drugs,
			beer: response.beer,
			personal: response.personal,
			romance: response.romance,
			relationships: response.relationships,
			atheism: response.atheism,
			nostalgia: response.nostalgia,
			lgbt: response.lgbt,
			wine: response.wine
		}
	};

	return newResponse;
}

var sentimentHQ = function(count, text, callback, list){
	if(count === text.length){
		callback(list);
	}
	else{
		indico.sentimentHQ(text[count].message)
		.then(function(res) {
			list.push({
				message: text[count].message,
				created: text[count].created_time,
				indico: res
			});
			sentimentHQ(count+1, text, callback, list);
		}).catch(function(err) {
			console.warn(err);
		});
	}
}

var entrySentiment = function(text, callback){
	var list = [];

	for(var i = 0; i < text.length; i++){
		if(!text[i].message){
			text.splice(i, 1);	
		}
	}
	sentimentHQ(0, text, callback, list);
}

var textTags = function(count, text, callback, list){
	if(count === text.length){
		callback(list);
	}
	else{
		indico.textTags(text[count].message)
		.then(function(res) {
			var temp = filterResponse(res, text[count]);
			list.push(temp);
			textTags(count+1, text, callback, list);
		}).catch(function(err) {
			console.warn(err);
		});
	}
}

var entryTextTags = function(text, callback){
	var list = [];

	for(var i = 0; i < text.length; i++){
		if(!text[i].message){
			text.splice(i, 1);	
		}
	}
	textTags(0, text, callback, list);
}

module.exports = {
	textTags: entryTextTags,
	sentiment: entrySentiment
}