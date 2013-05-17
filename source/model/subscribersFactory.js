/**
 * Subscribers saving factory
 */

var _ = require('underscore');
var notificationUtil = require('../utils/notification');
var subscribers = require('../db/subscribers');
var inviteUtil = require('./../utils/invite');

/*
 * Save user to subscribers list
 * @param req {Object} - getting full request
 * @param callback {Function} - basic callback with two args (error and saved object)
 */
function save (req, callback) {
	var request = req.body;
	var record = _.extend(request, {
		date: new Date(),
		ip: req.ip,
		inviteId: inviteUtil.createId(request.email, req.ip)
	});

	subscribers.update(record, saved);

	function saved (err, subscription) {
		if (err || !subscription) {
			return callback('subscription is not saved');
		}

		var message = 'Buddy ' + request.email + ' just subscribed and waiting for @likeastore.\n\nHurry up, guys!';
		notificationUtil.email(message, function (err) {
			if (err) {
				console.info(err);
			}
		});

		return callback(null, saved);
	}
}

module.exports = {
	save: save
};