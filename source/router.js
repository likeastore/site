var config = require('./../config')();
var subscribers = require('./db/subscribers');

module.exports = function (app) {
	app.get('/', index);
	app.get('/welcome', welcome);
	app.get('/commingsoon', commingSoon);

	function index(req, res) {
		res.render('index');
	}

	function welcome(req, res) {
		var user = req.query.user;
		var inviteId = req.query.inviteId;

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

				res.cookie('likeastore_invite_id', subscription.inviteId, { domain: config.domain, path: '/welcome' });

				return res.redirect(config.applicationUrl);
			});
		});
	}

	function commingSoon(req, res) {
		res.render('commingsoon');
	}
};