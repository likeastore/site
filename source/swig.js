var swig = require('swig');

swig.setFilter('linkify', function (input, idx) {
	var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

	var result = input.replace(urlRegex, function (url) {
		return '<a href="' + url + '" target="_blank">' + url + '</a>';
	});

	return result;
});

swig.setFilter('truncate', function (text, length, end) {
	if (isNaN(length)) {
		length = 100;
	}

	if (!end || typeof end !== 'string') {
		end = "...";
	}

	if (text.length <= length || text.length - end.length <= length) {
		return text;
	} else {
		return text.substring(0, length - end.length) + end;
	}
});

module.exports = swig;
