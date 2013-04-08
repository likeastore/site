/*
 * App routes
 */
var subscribers = require('./subscribersFactory');

var index = function (req, res) {
	res.render('index');
};

var notify = function (req, res) {
	res.end();
	// subscribers.save(req, function (err, saved) {
	// 	if (err) {
	// 		return res.send(500);
	// 	}
	// 	res.send(200);
	// });
};

module.exports = {
	index: index,
	notify: notify
};