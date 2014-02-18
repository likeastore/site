(function () {
	'use strict';

	window.ls = window.ls || {};

	if (window.location.hash === '#_=_') {
		window.location.href = window.location.href.split('#')[0];
	}

	ls.getCookie = function (name) {
		var units = document.cookie.split(name + '=');
		if (units.length === 2) {
			return units.pop().split(';').shift();
		}
	};

})();
