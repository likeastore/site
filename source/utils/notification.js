function sendEmail(text, callback) {
	if (!process.env.MANDRILL_TOKEN) {
		return callback('no mandrill token. ok for development mode, fail for production mode');
	}

	var mandrill = require('node-mandrill')(process.env.MANDRILL_TOKEN);

	var developers = [
		{email: 'alexander.beletsky@gmail.com'},
		{email: 'anton.mamant@gmail.com'},
		{email: 'dmitri.voronianski@gmail.com'}
	];

	return mandrill('/messages/send', {
		message: {
			text: text,
			from_email: 'app@likeastore.com',
			subject: 'New user waiting for release!',
			to: developers
		}
	}, callback);
}

module.exports = {
	email: sendEmail
};