var config = require('../config');
var Hashids = require('hashids');
var items = require('./models/items');
var users = require('./models/users');

var hashids = new Hashids(config.hashids.salt);
var env = process.env.NODE_ENV || 'development';

module.exports = function (app) {

	var index = function (req, res) {
		if (req.cookies.token) {
			return res.redirect(config.applicationUrl);
		}
		res.render('homepage', { title: 'Likeastore • Saves your likes & social activity', config: config, mode: env });
	};

	var register = function (req, res) {
		res.render('register', { title: 'Likeastore • Join', mode: env });
	};

	var forgotPassword = function (req, res) {
		res.render('forgot_password', { title: 'Likeastore • Forgot password?', mode: env });
	};

	var resetPassword = function (req, res) {
		if (!req.query.email || !req.query.request) {
			return res.redirect(config.siteUrl);
		}

		res.render('reset_password', { title: 'Likeastore • Reset password', mode: env, email: req.query.email, request: req.query.request});
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

	var serverErrorPage = function (req, res) {
		res.render('error_500_page', { title: 'Internal Server Error', error: {} });
	};

	var shareLike = function (req, res) {
		var hash = req.params.id;
		if (!hash) {
			return res.redirect(config.siteUrl);
		}

		var id = hashids.decryptHex(hash);
		if (!id || id === '') {
			return res.redirect(config.siteUrl);
		}

		items.findById(id, function (err, item) {
			if (err || !item) {
				return res.redirect(config.siteUrl);
			}

			users.findByEmail(item.user, function (err, user) {
				if (err || !user) {
					return res.redirect(config.siteUrl);
				}

				res.render('share_like', {
					title: (user.displayName || user.name) + '\'s like on ' + item.type + ' via likeastore',
					like: item,
					user: user,
					mode: env
				});
			});

		});
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

	var fail = function (req, res, next) {
		if (env === 'production') {
			return next();
		}

		setTimeout(function () {
			var nu = null;
			nu.access();

			res.send('Hello World');
		}, 1000);
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
	app.get('/s/:id', shareLike);
	app.get('/fail', fail);
	app.get('/500', serverErrorPage);
};
