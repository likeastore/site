var config = require('../../config');
var db = require('../db')(config);

exports.save = function (email, user, callback) {
	var network = {
		user: email,
		accessToken: user.token,
		accessTokenSecret: user.tokenSecret,
		service: user.provider
	};

	db.networks.update({ userId: user._id, service: user.provider }, network, { upsert: true }, function (err, net) {
		if (err) {
			return callback(err);
		}

		callback(null);
	});
};