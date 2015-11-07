var indico = require('indico.io');
indico.apiKey = process.env.INDICO_KEY;

var keywords = function(posts, callback){
	var list = [];
	for (var i = 0; i < posts.length; i++){
		if(posts[i].message){
			indico.keywords(posts[i].message)
			.then(function(res) {
				list.push(res);

				if(i === posts.length){
					callback(list);
				}
			}).catch(function(err) {
				console.warn(err);
			});
		}
	}
}

module.exports = {
	keywords: keywords
}