(function ($) {
	window.ls = window.ls || {};

	$('html').removeClass('no-js').addClass('js');

	if (window.location.hash === '#_=_') {
		window.location.href = window.location.href.split('#')[0];
	}

	$.Event.prototype.stop = function () {
		this.stopPropagation();
		this.preventDefault();
	};

	$.getCookie = function  (name) {
		var units = document.cookie.split(name + '=');
		if (units.length === 2) {
			return units.pop().split(';').shift();
		}
	};

	$.isDesktop = function () {
		return window.screenX !== 0 || !('ontouchstart' in window || 'onmsgesturechange' in window);
	};

	$.isIOS = function () {
		return (/(ipad|iphone|ipod)/g).test(navigator.userAgent.toLowerCase());
	};

	$.fn.validate = function () {
		var $target = $(this);
		var regex = $target.hasClass('email') ?
			/^[\w\._%\+\-]+@(?:[\w\-]+\.)+[A-Za-z]{2,6}$/i :
			/^[0-9A-z-_.+=@!#()&%?]+$/;

		return regex.test($target.val());
	};

	$.fn.serializeObject = function () {
		var object = {};
		var array = this.serializeArray();

		$.each(array, function() {
			if (object[this.name] !== undefined) {
				if (!object[this.name].push) {
					object[this.name] = [object[this.name]];
				}
				object[this.name].push(this.value || '');
			} else {
				object[this.name] = this.value || '';
			}
		});

		return object;
	};
})(jQuery);