// Handle unexpected errors with nice page

function serverError () {
	return function (err, req, res, next) {
		if (!err) {
			return next();
		}

		err.status = err.status || 500;
		res.render('error_500_page', { title: 'Internal Server Error', error: err });
	};
}

module.exports = serverError;
