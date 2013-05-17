var subscribers = require('./model/subscribersFactory');

module.exports = function (app) {
	app.post('/notify', notify);

	function notify(req, res) {
		subscribers.save(req, function (err, saved) {
			if (err) {
				return res.send(500);
			}
			res.send(200);
		});
	}
};