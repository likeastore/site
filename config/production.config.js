var config = {
	connection: process.env.MONGO_CONNECTION,
	options: {auto_reconnect: true},
	applicationUrl: 'http://app.likeastore.com'
};

module.exports = config;