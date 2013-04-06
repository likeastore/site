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
	var message = 'Buddy called ' + req.email + ' just subscribed and waiting for likeastore. Hurry up guys!';
	var data = req.body;

	var record = _.extend(data, {
		date: new Date(),
		ip: req.ip
	});

	// using 'upsert' flag to update doc if it exists 
	db.subscribers.update({ email: record.email }, record, { upsert: true }, addedDocument);

	function addedDocument (err, saved) {
		if (err || !saved) {
			return callback('User is not saved');
		} else {
			notificationUtil.email(message, function (err) {
				if (err) {
					console.info('Error while sending mandrill notification!');
					return;
				}
				console.info('Mandrill notification sent!');
			});

			return callback(null, saved);
		}
	}
}

module.exports = {
	save: save
};

