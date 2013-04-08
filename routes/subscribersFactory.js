/**
 * Subscribers saving factory
 */

var _ = require('underscore');
var notificationUtil = require('../utils/notification');
var db = require('../utils/dbConnector.js').db;

/*
 * Save user to subscribers list
 * @param req {Object} - getting full request
 * @param callback {Function} - basic callback with two args (error and saved object)
 */
function save (req, callback) {
	var request = req.body;
	var record = _.extend(request, {
		date: new Date(),
		ip: req.ip
	});

	db.subscribers.update({ email: request.email }, record, { upsert: true }, addedDocument);

	function addedDocument (err, saved) {
		if (err || !saved) {
			return callback('User is not saved');
		}

		var message = 'Buddy ' + request.email + ' just subscribed and waiting for @likeastore.\n\n Hurry up guys!';
		notificationUtil.email(message, function (err) {
			if (err) {
				console.info('Error while sending mandrill notification!');
				return callback('Error while sending mandrill notification');
			}
			console.info('Mandrill notification sent!');
			return callback(null, saved);
		});
	}
}

module.exports = {
	save: save
};