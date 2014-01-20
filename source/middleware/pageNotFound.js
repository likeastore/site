// include it only as last middleware

function pageNotFound () {
	return function (req, res) {
		return res.status(404).redirect('/');
	};
}

module.exports = pageNotFound;
