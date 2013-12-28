var config = {
	connection: process.env.MONGO_CONNECTION,
	options: {
		auto_reconnect: true
	},

	applicationUrl: 'https://app.likeastore.com',
	siteUrl: 'https://likeastore.com',

	hashids: {
		salt: '0b208b34946d64c41a11bab4eb34a7c6515ac2e9'
	},

	// api keys
	services: {
		github: {
			appId: process.env.GITHUB_APP_ID,
			appSecret: process.env.GITHUB_APP_SECRET,
			quotas: {
				requests: {
					perMinute: 1
				},
				repeatAfterMinutes: 15
			}
		},

		twitter: {
			consumerKey: process.env.TWITTER_CONSUMER_KEY,
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
			quotas: {
				requests: {
					perMinute: 1
				},
				repeatAfterMinutes: 15
			}
		},

		facebook: {
			appId: process.env.FACEBOOK_APP_ID,
			appSecret: process.env.FACEBOOK_APP_SECRET
		},

		stackoverflow: {
			clientId: process.env.STACKOVERFLOW_CLIENT_ID,
			clientKey: process.env.STACKOVERFLOW_CLIENT_KEY,
			clientSecret: process.env.STACKOVERFLOW_CLIENT_SECRET,
			quotas: {
				requests: {
					perMinute: 1
				},
				repeatAfterMinutes: 15
			}
		}
	},

	analytics: {
		url: 'https://analytics.likeastore.com',
		username: 'likeastore',
		password: 'likeadmin7analitics'
	},

	mandrill: {
		token: process.env.MANDRILL_TOKEN
	},

	collector: {
		engineRestartInterval: 65000
	}
};

module.exports = config;