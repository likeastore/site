var moment = require('moment');
var config = require('../../config');
var db = require('../db')(config);

function pulse(interval, callback) {
	db.pulse.findOne({interval: interval, date: moment().format('YYYY-MM-DD')}, function (err, item) {
		if (err) {
			return callback(err);
		}

		callback(null, item.results);
	});
}

module.exports = {
	pulse: pulse
};