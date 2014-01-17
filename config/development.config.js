var config = {
	connection: 'mongodb://localhost:27017/likeastoredb',
	options: {
		auto_reconnect: true
	},

	applicationUrl: 'http://localhost:3001',
	siteUrl: 'http://localhost:3000',

	hashids: {
		salt: '0b208b34946d64c41a11bab4eb34a7c6515ac2e9'
	},

	// api keys
	services: {
		github: {
			appId: '3a3bd66d4ddb7b38588c',
			appSecret: '07c869fe1c19c0278b7481acf4d8e988421fed06',
			quotas: {
				requests: {
					perMinute: 1
				},
				repeatAfterMinutes: 15
			}
		},

		twitter: {
			consumerKey: 'dgwuxgGb07ymueGJF0ug',
			consumerSecret: 'eusoZYiUldYqtI2SwK9MJNbiygCWOp9lQX7i5gnpWU',
			quotas: {
				requests: {
					perMinute: 1
				},
				repeatAfterMinutes: 15
			}
		},

		facebook: {
			appId: '686544048039071',
			appSecret: '8f5bc7d56d319bb6f285a568cf82b608'
		},

		stackoverflow: {
			clientId: '1533',
			clientKey: 'J2wyheThU5jYFiOpGG22Eg((',
			clientSecret: 'KOCBFY4OUP6OE7Q1xNw1wA((',
			quotas: {
				requests: {
					perMinute: 1
				},
				repeatAfterMinutes: 15
			}
		}
	},

	analytics: {
		url: 'http://localhost:3005',
		username: 'likeastore',
		password: 'mypass'
	},

	ga: {
		id: 'UA-41034999-1',
		domain: 'localhost'
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