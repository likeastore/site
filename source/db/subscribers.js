var _ = require('underscore');
var db = require('./dbConnector').db;
var keen = require('../utils/keen');

/**
 * (!) NOTA BENE: (remove when we'll enable schema)
 * {
 *   "email" : "a@a.co",          - valid email string (unique);
 *   "date" : ISODate(".."),      - date of subscribtion;
 *   "ip" : "127.0.0.1",          - ip of subscribtion;
 *   "inviteId" : 'SHA-1'         - DEPRECATED (used for private beta);
 *   "_id" : ObjectId("100")      - mongodb object id;
 * }
 */

exports.save = function (req, callback) {
	var subscriber = _.extend(req.body, {
		date: new Date(),
		ip: req.ip
	});

	db.subscribers.update({ email: subscriber.email }, subscriber, { upsert: true }, function (err, subscription) {
		if (err || !subscription) {
			return callback('subscription is not saved');
		}

		keen.addEvent('User subscribed', { subscriber: subscriber.email });
		callback(null, subscription);
	});
};

exports.stream = function () {
	return db.subscribers.find({});
};
