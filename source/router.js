var config = require('../config');
var env = process.env.NODE_ENV || 'development';

module.exports = function (app) {

	var index = function (req, res) {
		res.render('homepage', { title: 'Likeastore • Saves your likes & social activity', mode: env });
	};

	var register = function (req, res) {
		res.render('register', { title: 'Likeastore • Join', mode: env });
	};

	var forgotPassword = function (req, res) {
		res.render('forgot-password', { title: 'Likeastore • Forgot Password?', mode: env });
	};

	var resetPassword = function (req, res) {
		if (!req.query.email || !req.query.request) {
			return res.redirect(config.siteUrl);
		}

		res.render('reset-password', { title: 'Likeastore • Forgot Password?', mode: env, email: req.query.email, request: req.query.request});
	};

	var setup = function (req, res) {
		res.render('setup', { title: 'Likeastore • Setup', mode: env, user: req.user });
	};

	var termsOfUse = function (req, res) {
		res.render('terms_of_use',  { title: 'Likeastore • Terms and Conditions of Use', mode: env });
	};

	var privacyPolicy = function (req, res) {
		res.render('privacy',  { title: 'Likeastore • Privacy Policy', mode: env });
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
	app.get('/join', register);
	app.get('/login', register);
	app.get('/register', register);
	app.get('/forgot-password', forgotPassword);
	app.get('/reset-password', resetPassword);
	app.get('/setup', checkAuth, checkFirstTime, setup);
	app.get('/terms', termsOfUse);
	app.get('/privacy', privacyPolicy);
};
