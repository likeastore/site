var config = require('likeastore-config');

/**
 * Routes
 */
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
	if (req.user.email) {
		return res.redirect(config.applicationUrl);
	}

	res.render('setup', { title: 'Setup | likeastore.', user: req.user });
};

module.exports = function (app) {
	app.get('/', index);
	app.get('/login', login);
	app.get('/register', register);
	app.get('/setup', setup);
};