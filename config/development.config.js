var config = {
	connection: 'mongodb://localhost:27017/likeastoredb',
	options: {
		auto_reconnect: true
	},

	applicationUrl: 'http://localhost:3001',
	siteUrl: 'http://localhost:3000',

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

	mandrill: {
		token: null
	},

	keen: {
		writeKey: '078a70b71c9f32587ae49fb155abb45e172cdf47072ee6879d846f0eb7c4a8dc23990ad0ed1b0ce6258f08bd9324fc283ef12e242f3dca21f758bb8b6d362dc512d4d5e52c6690200ca72d7b779688ddc7091fae69d84af714ba82f6044131b64e1808626b3a6dd4c220cfd7aff83e66'
	},

	collector: {
		engineRestartInterval: 65000
	}
};

module.exports = config;