var config = {
	connection: process.env.MONGO_CONNECTION,
	options: {
		auto_reconnect: true
	},

	applicationUrl: 'https://app.likeastore.com',
	siteUrl: 'https://likeastore.com',

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

	mandrill: {
		token: process.env.MANDRILL_TOKEN
	},

	keen: {
		writeKey: '078a70b71c9f32587ae49fb155abb45e172cdf47072ee6879d846f0eb7c4a8dc23990ad0ed1b0ce6258f08bd9324fc283ef12e242f3dca21f758bb8b6d362dc512d4d5e52c6690200ca72d7b779688ddc7091fae69d84af714ba82f6044131b64e1808626b3a6dd4c220cfd7aff83e66'
	},

	collector: {
		engineRestartInterval: 65000
	}
};

module.exports = config;