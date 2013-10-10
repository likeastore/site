var _ = require('underscore');
var config = require('../config');
var users = require('./db/users');
var subscribers = require('./db/subscribers');
var networks = require('./db/networks');
var schemas = require('./schemas');

module.exports = function (app, passport) {

	var authRedirect = {
		successReturnToOrRedirect: '/setup',
		failureRedirect: '/login'
	};

	var notify = function (req, res) {
		subscribers.save(req, function (err) {
			if (err) {
				return res.send(500);
			}
			res.json({ message: 'You have been subscribed successfully!' });
		});
	};

	var localAuth = function (req, res) {
		users.findOrCreateLocal(req.body, function (err, user) {
			if (err) {
				return res.send(500, err);
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
				return res.send(500, err);
			}

			var email = req.body.email || req.user.email;
			var appRedirectUrl = config.applicationUrl + '?email=' + email + '&apiToken=' + req.user.apiToken;

			if (req.user.provider === 'local') {
				delete req.session.localUser;
				return res.json({ applicationUrl: appRedirectUrl });
			}

			networks.save(email, req.user, function (err, net) {
				if (err) {
					return res.send(500, err);
				}
				return res.json({ applicationUrl: appRedirectUrl });
			});
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
					return res.send(412, err);
				}
				return next();
			});
		};
	};

	app.post('/notify', validate('subscribeSchema'), notify);
	app.post('/auth/setup', validate('setupUserSchema'), setupUser);
	app.post('/auth/local/login', validate('findOrCreateUserSchema'), localAuth);
	app.get('/auth/twitter', cleanSession, passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', authRedirect));
	app.get('/auth/github', cleanSession, passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github', authRedirect));
	app.get('/auth/facebook', cleanSession, passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', authRedirect));

};
