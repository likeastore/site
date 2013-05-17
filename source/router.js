module.exports = function (app) {
	app.get('/', index);
	app.get('/welcome', welcome);

	function index(req, res) {
		res.render('index');
	}

	function welcome(req, res) {
		res.render('index');
	}
};