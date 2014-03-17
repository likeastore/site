(function () {
	'use strict';

	window.ls = window.ls || {};

	ls.getCookie = function (name) {
		var units = document.cookie.split(name + '=');
		if (units.length === 2) {
			return units.pop().split(';').shift();
		}
	};

})();
