var db = require('./dbConnector').db;

module.exports = {
	update: function (subscriber, callback) {
		db.subscribers.update({email: subscriber.email}, subscriber, {upsert: true}, callback);
	},

	find: function (query, callback) {
		return db.subscribers.find(query, callback);
	},

	stream: function () {
		return db.subscribers.find({});
	}
};