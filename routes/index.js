var _ = require('underscore');
var async = require('async');
var dbUtil = require('../utils/db');
var notificationUtil = require('../utils/notification');

var index = function(req, res){
	res.render('index');
};

var notify = function (req, res) {
	var request = req.body;
	var db = dbUtil(req);

	var record = _.extend(request, {
		date: new Date(),
		ip: req.ip
	});

	function checkForDuplicate(callback) {
		db.find({email: request.email}, 'notificationRequest', function (err, result) {
			if (err) {
				return callback(err);
			}

			if (result) {
				return callback('already subscribed');
			}

			callback(null);
		});
	}

	function storeRequest(callback) {
		db.save(record, 'notificationRequest', callback);
	}

	function sendNotification(callback) {
		var message = 'Buddy called ' + request.email + ' just subscribed and waiting for likeastore. Hurry up guys!';
		notificationUtil.email(message, callback);
	}

	async.series([checkForDuplicate, storeRequest, sendNotification], function (err, result) {
		console.log(err);

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