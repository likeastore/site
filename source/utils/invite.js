var crypto = require('crypto');

module.exports = {
	createId: function (email, ip) {
		var message = 'likeastore_invite_' + email + ip;
		var hash = crypto.createHash('sha256');
		hash.update(message);
		return hash.digest('hex');
	}
};