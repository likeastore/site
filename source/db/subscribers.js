var db = require('./dbConnector').db;

module.exports = {
	update: function (subscriber, callback) {
		return db.subscribers.update({email: subscriber.email}, subscriber, {upsert: true}, callback);
	},

	find: function (query, callback) {
		return db.subscribers.find(query, callback);
	},

	findOne: function (query, callback) {
		return db.subscribers.findOne(query, callback);
	},

	activate: function (subscriber, callback) {
		subscriber.activated = true;
		return this.update(subscriber, callback);
	},

	stream: function () {
		return db.subscribers.find({});
	}
};