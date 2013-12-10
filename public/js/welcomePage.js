/* global ls: true
 * Welcome page scripts (scroll effects and parallax)
 */

ls.welcomePage = {

	init: function () {
		$('.step1').css('height', $(window).height() - 10);
		$('.image').css('margin-left', -$('.image img').width() / 2);
		this.initOnScroll();
		this.initScrollParallax();
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
		var barsTop = $('.bars').offset().top;

		$window.scroll(function () {
			$('body').toggleClass('stepper', $window.scrollTop() >= barsTop);
			$('.overlay').css({ 'visibility': 'visible', 'opacity': $window.scrollTop() / 1000 });
			$('.image').css('-webkit-transform', 'translateY(' + $window.scrollTop() / 7 + 'px)');
		});
	}
};

$(function () {
	ls.welcomePage.init();
});