var config = require('likeastore-config');
var subscribers = require('./db/subscribers');

var oneMonth = 2678400000;

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

// TO DO: should be deprecated
var welcome = function (req, res) {
	var user = req.query.user;
	var inviteId = req.query.invite;

	if (!user || !inviteId) {
		return res.redirect('commingsoon');
	}

	subscribers.findOne({email: user, inviteId: inviteId}, function (err, subscription) {
		if (err || !subscription) {
			return res.redirect('commingsoon');
		}

		subscribers.activate(subscription, function (err) {
			if (err) {
				return res.send(500);
			}

			res.cookie('likeastoreInviteId', subscription.inviteId, { domain: config.domain, maxAge: oneMonth});

			return res.redirect(config.applicationUrl);
		});
	});
};

module.exports = function (app) {
	app.get('/', index);
	app.get('/login', login);
	app.get('/register', register);
};