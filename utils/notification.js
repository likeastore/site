var mandrill = require('node-mandrill')(process.env.MANDRILL_TOKEN);

function sendEmail(text, callback) {
	return mandrill('/messages/send', {
		message: {
			text: text,
			from_email: 'app@likeastore.com',
			subject: 'New user waiting for release!',
			to: [ {email: 'alexander.beletsky@gmail.com'}]
		}
	}, callback);
}

module.exports = {
	email: sendEmail
};