exports.index = function(req, res){
	res.render('index');
};

exports.notify = function (req, res) {
	console.log(req.body);
	res.end();
};