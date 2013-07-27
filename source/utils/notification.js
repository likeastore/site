var config = require('../../config');

function sendEmail(subject, text, callback) {
	var mandrill = require('node-mandrill')(config.mandrill.token);

	var developers = [
		{email: 'devs@likeastore.com'},
	];

	return mandrill('/messages/send', {
		message: {
			text: text,
			from_email: 'app@likeastore.com',
			subject: subject,
			to: developers
		}
	}, callback);
}

module.exports = {
	sendEmail: sendEmail
};