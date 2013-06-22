var config = require('likeastore-config');
var users = require('./db/users.js');
var subscribers = require('./model/subscribersFactory');

module.exports = function (app, passport) {

	var authRedirect = {
		successReturnToOrRedirect: '/setup',
		failureRedirect: '/'
	};

	var notify = function (req, res) {
		subscribers.save(req, function (err, saved) {
			if (err) {
				return res.send(500);
			}

			res.send(200);
		});
	};

	var localAuth = function (req, res) {
		users.findOrCreateLocal(req.body, function (err, user) {
			if (err) {
				return res.send(500, err);
			}

			res.json({ applicationUrl: config.applicationUrl });
		});
	};

	var setupServiceUser = function (req, res) {
		users.setupServiceUser(req.user._id, req.body, function (err) {
			if (err) {
				return res.send(500, err);
			}

			res.json({ applicationUrl: config.applicationUrl });
		});
	};

	app.post('/notify', notify);
	app.post('/auth/setup', setupServiceUser);
	app.post('/auth/local/login', localAuth);
	app.post('/auth/local/register', localAuth);
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', authRedirect));
	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github', authRedirect));
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', authRedirect));
};
