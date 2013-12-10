/*
 * Welcome page scripts (scroll effects and parallax)
 */

ls.welcomePage = {

	init: function () {
		this.initScrollParallax();
		this.initOnScroll();
	},

	initScrollParallax: function () {
		$('.scrolly').on('click', function (e) {
			e.stop();

			var $anchor = $(this);
			var href = $anchor.attr('href');

			$('html, body').animate({
				scrollTop: $(href).offset().top
			}, 1000, function () {
				$('body').addClass('stepper');
			});
		});
	},

	initOnScroll: function () {
		var $window = $(window);
		var $body = $('body');
		var $image = $body.find('.image');
		var $overlay = $body.find('.overlay');
		var barsTop = $('.bars').offset().top;

		$window.scroll(function () {
			$body.toggleClass('stepper', $window.scrollTop() >= barsTop);
			$image.css('-webkit-transform', 'translateY(' + $window.scrollTop() / 7 + 'px)');
			$overlay.css({ 'visibility': 'visible', 'opacity': $window.scrollTop() / 1000 });
		});
	}
};

$(function () {
	ls.welcomePage.init();
});