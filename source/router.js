var config = require('likeastore-config');

module.exports = function (app) {

	var index = function (req, res) {
		res.render('index', { title: 'likeastore.' });
	};

	var login = function (req, res) {
		res.render('login', { title: 'Login | likeastore.' });
	};

	var register = function (req, res) {
		res.render('register', { title: 'Register | likeastore.' });
	};

	var setup = function (req, res) {
		if (!req.user.firstTimeUser) {
			return res.redirect(config.applicationUrl);
		}
		res.render('setup', { title: 'Setup | likeastore.', username: req.user.username || 'Your username' });
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
	app.get('/setup', checkAuth, setup);

};
