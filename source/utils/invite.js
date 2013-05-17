var crypto = require('crypto');
var subscribers = require('./../db/subscribers');

module.exports = {
	createId: function (email, ip) {
		var message = 'likeastore_invite_' + email + ip;
		var hash = crypto.createHash('sha256');
		hash.update(message);
		return hash.digest('hex');
	},

	ensureInvites: function (callback) {
		var me = this;
		var stream = subscribers.stream();

		stream.on('error', callback);
		stream.on('data', update);
		stream.on('end', callback);

		function update (subscriber) {
			if (!subscriber.inviteId) {
				subscriber.inviteId = me.createId(subscriber.email, subscriber.id);
				subscribers.update(subscriber, function (err) {
					if (err) {
						return callback(err);
					}
				});
			}
		}

	}
};