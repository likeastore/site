var config = {
	connection: process.env.MONGO_CONNECTION,
	options: {
		auto_reconnect: true
	},

	applicationUrl: 'https://app-stage.likeastore.com',
	siteUrl: 'https://stage.likeastore.com',

	hashids: {
		salt: '0b208b34946d64c41a11bab4eb34a7c6515ac2e9'
	},

	auth: {
		cookieName: 'auth_token',
		signKey: 'c88afe1f6aa4b3c7982695ddd1cdd200bcd96662',
		tokenTtl: 10080, // minutes, 7 days
		secure: false
	},

	access: {
		user: process.env.BASICAUTH_USER,
		password: process.env.BASICAUTH_PASSWORD
	},

	// api keys
	services: {
		github: {
			appId: '47974c5d6fefbe07881e',
			appSecret: 'f1008ace415b3892bd36ef97443452a39dd7c29f'
		},

		twitter: {
			consumerKey: 'XDCQAahVo1EjhFqGoh5c2Q',
			consumerSecret: 'LppQuUU5FDTRwFJRwnlhfGj3IMDDTKmVCUm1JTHkA'
		},

		facebook: {
			appId: '554634024574376',
			appSecret: 'a8d2c5e643b67cdf80ed8b8832634b2c'
		},

		stackoverflow: {
			clientId: '1801',
			clientKey: 'L)KUpw85QEW105j43oik8g((',
			clientSecret: 'DadJ5kAh3YWlj0wv7EHqDg(('
		}
	},

	analytics: {
		url: 'http://analytics.stage.likeastore.com',
		username: 'likeastore',
		password: 'likeadmin7analitics'
	},

	ga: {
		id: 'UA-41034999-1',
		domain: 'stage.likeastore.com'
	},

	mandrill: {
		token: '2kXX0stV1Hf56y9DYZts3A'
	},

	logentries: {
		token: null,
	},

	collector: {
		engineRestartInterval: 65000
	}
};

module.exports = config;