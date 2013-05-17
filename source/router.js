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

		res.redirect('http://localhost:3001');
	}

	function commingSoon(req, res) {
		res.render('commingsoon');
	}
};