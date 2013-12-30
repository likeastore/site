var swig = require('swig');

swig.setFilter('linkify', function (input, idx) {
	var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

	var result = input.replace(urlRegex, function (url) {
		return '<a href="' + url + '" target="_blank">' + url + '</a>';
	});

	return result;
});

module.exports = swig;