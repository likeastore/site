var _ = require('underscore');
var config = require('likeastore-config');
var services = config.services;
var db = require('./dbConnector').db;

exports.save = function (user, callback) {
	var network = {
		userId: user._id,
		username: user.username,
		accessToken: user.token,
		accessTokenSecret: user.tokenSecret,
		service: user.provider,
		quotas: services[user.provider].quotas
	};

	db.networks.update({ userId: user._id, service: user.provider }, network, { upsert: true }, function (err, net) {
		if (err) {
			return callback(err);
		}

		callback(null);
	});
};