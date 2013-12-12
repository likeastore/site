var config = require('../config');
var env = process.env.NODE_ENV || 'development';

module.exports = function (app) {

	var index = function (req, res) {
		res.render('homepage', { title: 'Likeastore', mode: env });
	};

	var register = function (req, res) {
		res.render('register', { title: 'Register likeastore account', mode: env });
	};

	var setup = function (req, res) {
		res.render('setup', { title: 'Setup likeastore account', mode: env, user: req.user });
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

	var redirectToHome = function (req, res, next) {
		res.redirect('/');
	}

	app.get('/', index);
	app.get('/join', register);
	app.get('/login', register);
	app.get('/register', register);
	app.get('/setup', checkAuth, checkFirstTime, setup);
	app.get('*', redirectToHome);
};
