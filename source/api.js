var subscribers = require('./model/subscribersFactory');

/**
 * Action urls
 */
var notify = function (req, res) {
	subscribers.save(req, function (err, saved) {
		if (err) {
			return res.send(500);
		}
		res.send(200);
	});
};

// TO DO: move passport auth here
module.exports = function (app) {
	app.post('/notify', notify);
};