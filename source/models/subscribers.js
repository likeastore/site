var _ = require('underscore');
var config = require('../../config');
var db = require('../db')(config);
var notificationUtil = require('../utils/notification');

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

		var title = '[likeastore] New user subscribed for notifications!';
		var message = 'Buddy ' + subscriber.email + ' just subscribed for notifications!';
		notificationUtil.sendEmail(title, message, function (err) {
			if (err) {
				console.error(err);
			}

			return callback(null);
		});
	});
};

exports.stream = function () {
	return db.subscribers.find({});
};
