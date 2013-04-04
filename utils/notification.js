var mandrill = require('node-mandrill')(process.env.MANDRILL_TOKEN);

function sendEmail(text, callback) {
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