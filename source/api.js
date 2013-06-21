var subscribers = require('./model/subscribersFactory');

var authRedirect = {
	successReturnToOrRedirect: '/setup',
	failureRedirect: '/'
};

/**
 * Action urls
 */
var notify = function (req, res) {
	subscribers.save(req, function (err, saved) {
		if (err) {
			return res.send(500);
		}
		res.send(200);
	});
};

var setupServiceUser = function (req, res) {
	// save user data to db
	// should we speak with networks via apps API or have local module?
};

module.exports = function (app, passport) {

	app.post('/notify', notify);

	// Passport local authorization

	app.post('/auth/local/login', passport.authenticate('local', authRedirect));
	app.post('/auth/local/register', passport.authenticate('local', authRedirect));

	// Passport third-party services authorization

	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', authRedirect));
	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github', authRedirect));
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', authRedirect));

	// First-time third-party service user setup

	app.post('/auth/setup', setupServiceUser);
};