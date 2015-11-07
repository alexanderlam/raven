var indico = require('indico.io');
indico.apiKey = process.env.INDICO_KEY;

var keywords = function(posts, callback){
	var list = [];

	for (var post in posts){
		if(post.message){
			indico.keywords(post.message)
			.then(function(res) {
				console.log(res);
				list.push(res);

				if(list.length === posts.length){
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