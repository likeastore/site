var config = require('../config');
var mode = process.env.NODE_ENV || 'development';

module.exports = function (app) {

	var index = function (req, res) {
		res.render('homepage', { title: 'likeastore.', mode: mode });
	};

	var login = function (req, res) {
		res.render('login', { title: 'Login @ likeastore.', mode: mode });
	};

	var register = function (req, res) {
		res.render('register', { title: 'Register @ likeastore.', mode: mode });
	};

	var setup = function (req, res) {
		res.render('setup', { title: 'Setup @ likeastore.', mode: mode, user: req.user });
	};

	var checkFirstTime = function (req, res, next) {
		if (req.user.firstTimeUser) {
			return next();
		}

		var appRedirectUrl = config.applicationUrl + '?email=' + req.user.email + '&apiToken=' + req.user.apiToken;
		res.redirect(appRedirectUrl);
	};

	var checkAuth = function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/register');
	};

	app.get('/', index);
	app.get('/login', login);
	app.get('/register', register);
	app.get('/setup', checkAuth, checkFirstTime, setup);

};
