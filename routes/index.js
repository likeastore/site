var _ = require('underscore');

var index = function(req, res){
	res.render('index');
};

var notify = function (req, res) {
	var email = req.body;

	var request = _.extend(email, {
		date: new Date(),
		ip: req.ip
	});

	var requests = req.mongo.collection('notificationRequest');
	requests.insert(request, function (err, result) {
		if (err) {
			return res.send(500);
		}

		return res.send(result);
	});
};

module.exports = {
	index: index,
	notify: notify
};