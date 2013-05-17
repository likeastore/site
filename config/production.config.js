var config = {
	connection: process.env.MONGO_CONNECTION,
	options: {auto_reconnect: true},
	applicationUrl: 'http://likeastore-app.eu01.aws.af.cm',
	domain: '.eu01.aws.af.cm'
};

module.exports = config;