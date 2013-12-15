/*
 * Welcome page scripts (scroll effects and parallax)
 */

ls.welcomePage = {

	init: function () {
		this.setHeights();
		this.initOnScroll();
		this.initScrollParallax();
	},

	setHeights: function () {
		var $window = $(window);
		var $image = $('.image');

		$image.animate(getBottomSize(), 1200)

		alignImageAndBlock();

		$window.resize(function () {
			$image.css(getBottomSize());
			alignImageAndBlock();
		});

		function alignImageAndBlock () {
			$('.step1').css('height', $window.height() - 10);
			$image.css('margin-left', -$image.find('img').width() / 2);
		}

		function getBottomSize () {
			var dynamicHeight = $window.height();

			if (dynamicHeight < 700 && dynamicHeight > 600) {
				return { bottom: '-80px' };
			}

			if (dynamicHeight < 600 && dynamicHeight > 500) {
				return { bottom: '-140px' };
			}

			if (dynamicHeight < 500 && dynamicHeight > 400) {
				return { bottom: '-200px' };
			}

			return { bottom: '0px' };
		}
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
			$overlay.css({
				'visibility': 'visible',
				'opacity': $window.scrollTop() / 1000
			});
			$image.css('-webkit-transform', 'translateY(' + $window.scrollTop() / 7 + 'px)');
			$body.toggleClass('stepfixer', $window.scrollTop() >= barsTop);
		});
	}
};

$(function () {
	ls.welcomePage.init();
});