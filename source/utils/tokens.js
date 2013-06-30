var crypto = require('crypto');

function generateApiToken (username) {
	var message = username + ';' + new Date().toISOString();
	return crypto.createHash('sha1').update(message).digest('hex');
}

module.exports = {
	generateApiToken: generateApiToken
};