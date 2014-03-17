(function () {
	'use strict';

	if (window.location.hash === '#_=_') {
		window.location.href = window.location.href.split('#')[0];
	}

	window.ls = window.ls || {};

	ls.getCookie = function (name) {
		var units = document.cookie.split(name + '=');
		if (units.length === 2) {
			return units.pop().split(';').shift();
		}
	};

})();
