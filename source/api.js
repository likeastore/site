var _ = require('underscore');
var request = require('request');

var config = require('../config');
var users = require('./models/users');
var emails = require('./models/emails');
var subscribers = require('./models/subscribers');
var networks = require('./models/networks');
var schemas = require('./schemas');

module.exports = function (app, passport) {

	var notify = function (req, res) {
		subscribers.save(req, function (err) {
			if (err) {
				return res.json(500, err);
			}
			res.json({ message: 'You have been subscribed successfully!' });
		});
	};

	var localAuth = function (req, res) {
		users.findOrCreateLocal(req.body, function (err, user) {
			if (err) {
				return res.json(500, err);
			}

			if (user.firstTimeUser) {
				req.session.localUser = _(user).extend({
					username: user.email.substring(0, user.email.indexOf('@'))
				});
				return res.json({ applicationUrl: '/setup' });
			}

			var appRedirectUrl = config.applicationUrl + '?email=' + user.email + '&apiToken=' + user.apiToken;
			res.json({ applicationUrl: appRedirectUrl });
		});
	};

	var setupUser = function (req, res) {
		users.finishUserSetup(req.user._id, req.body, function (err) {
			if (err) {
				return res.json(500, err);
			}

			var email = req.body.email || req.user.email;
			var appRedirectUrl = config.applicationUrl + '?email=' + email + '&apiToken=' + req.user.apiToken;

			if (req.user.provider === 'local') {
				delete req.session.localUser;
				return res.json({ applicationUrl: appRedirectUrl });
			}

			networks.save(email, req.user, function (err, net) {
				if (err) {
					return res.json(500, err);
				}
				return res.json({ applicationUrl: appRedirectUrl });
			});
		});
	};

	var createResetPasswordRequest = function (req, res) {
		var email = req.body.email;
		if (!email) {
			res.json({message: 'Email is required', status: 412});
		}

		users.resetPasswordRequest(email, function (err, request) {
			if (err) {
				return res.json(403, err);
			}

			var url = config.siteUrl + '/reset-password?email=' + email + '&request=' + request.id;
			emails.sendTemplate([{email: email}], 'reset-password', [{name: 'URL', content: url}], function (err) {
				if (err) {
					return res.json(500, err);
				}

				res.json(200, {message: 'Thanks, email with instuctions just went to your inbox.'});
			});
		});
	};

	var resetPassword = function (req, res) {
		var request = req.body.request;
		var email = req.body.email;
		var password = req.body.password;

		if (!password) {
			return res.json({message: 'Password is required', status: 412});
		}

		users.changePassword(email, request, password, function (err) {
			if (err) {
				return res.json(500, err);
			}

			res.json(200, {message: 'Your password has been reset.'});
		});
	};

	var getLikesCount = function (req, res, next) {
		request(config.applicationUrl + '/api/items/count', function (err, resp, body) {
			if (err) {
				return res.json(500, err);
			}

			res.json(200, body);
		});
	};

	var cleanSession = function (req, res, next) {
		delete req.session.localUser;
		return next();
	};

	var validate = function (model) {
		return function (req, res, next) {
			schemas.validate(req.body, model, function (err) {
				if (err) {
					return res.json(412, err);
				}
				return next();
			});
		};
	};

	var getMobileUser = function (req, res) {
		var accessToken = req.query.access_token;
		var userId = req.query.id;

		if (!accessToken) {
			return res.json(401, {message: 'access_token is missing'});
		}
		if (accessToken !== config.iosClient.accessToken) {
			return res.json(401, {message: 'access_token is wrong'});
		}
		if (!userId) {
			return res.json(401, {message: 'user id is missing'});
		}

		users.findById(userId, function (err, user) {
			if (err) {
				return res.json(500, err);
			}

			user = _(user).pick('_id', 'email', 'apiToken', 'username', 'name');
			return res.json(user);
		});
	};

	var authenticateCallback = function (network) {
		return function (req, res, next) {
			var iOSClient = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(req.headers['user-agent']);

			var authRedirect = !iOSClient ?
				// web client
				{ successReturnToOrRedirect: '/setup', failureRedirect: '/login' } :

				// on iphone client respond with user identifier
				function (err, user) {
					if (err) {
						return next(err);
					}
					return res.redirect('/blank.html?id=' + user._id);
				};

			passport.authenticate(network, authRedirect)(req, res, next);
		};
	};

	app.post('/notify', validate('subscribeSchema'), notify);
	app.post('/auth/setup', validate('setupUserSchema'), setupUser);
	app.post('/auth/local/login', validate('findOrCreateUserSchema'), localAuth);
	app.get('/auth/twitter', cleanSession, passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', authenticateCallback('twitter'));
	app.get('/auth/github', cleanSession, passport.authenticate('github'));
	app.get('/auth/github/callback', authenticateCallback('github'));
	app.get('/auth/facebook', cleanSession, passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', authenticateCallback('facebook'));
	app.post('/resetpassword/request', createResetPasswordRequest);
	app.post('/resetpassword', resetPassword);
	app.get('/likescount', getLikesCount);

	// mobile specials
	app.get('/auth/mobile/user', getMobileUser);
};
