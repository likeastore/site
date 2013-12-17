/* jshint multistr: true */
/*
 * Welcome page scripts (scroll effects and parallax)
 */

ls.welcomePage = {

	init: function () {
		this.setHeights();
		this.initOnScroll();
		this.initScrollParallax();

		if ($.isDesktop()) {
			this.initRegisterDialog();
		}
	},

	setHeights: function () {
		var $window = $(window);
		var $image = $('.image');

		$image.animate(getBottomSize(), 1200);
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
			var dynamicWidth = $window.width();
			var desktop = $.isDesktop();

			if (!desktop || dynamicWidth < 640) {
				return { bottom: '0px' };
			}

			if (dynamicHeight <= 700 && dynamicHeight > 600) {
				return { bottom: '-80px' };
			}

			if (dynamicHeight <= 600 && dynamicHeight > 500) {
				return { bottom: '-140px' };
			}

			if (dynamicHeight <= 500) {
				return { bottom: '-200px' };
			}

			return { bottom: '0px' };
		}
	},

	initRegisterDialog: function (e) {
		$('.open-register-dialog').on('click', function (e) {
			e.stop();

			vex.open({
				content: '\
					<h2 class="dialog-title">Join</h2>\
					<div class="social-auth">\
						<a class="facebook auth-btn" href="/auth/facebook">\
							<i data-icon="g" class="icon"></i>\
							<span>Log in with facebook</span>\
						</a>\
						<a class="twitter auth-btn" href="/auth/twitter">\
							<i data-icon="b" class="icon"></i>\
							<span>Log in with twitter</span>\
						</a>\
						<a class="github auth-btn" href="/auth/github">\
							<i data-icon="d" class="icon"></i>\
							<span>Log in with github</span>\
						</a>\
					</div>\
					<div class="separator">&#126;</div>\
					<form action="/auth/local/login" class="formular register" method="post" accept-charset="utf-8" novalidate>\
						<div class="msg"></div>\
						<div>\
							<input type="email" name="email" class="field email" placeholder="Email" autocomplete="off">\
						</div>\
						<div>\
							<input type="password" name="password" class="field password" placeholder="Password">\
						</div>\
						<button type="submit" class="do-register-btn btn green-btn">Sign in</button>\
					</form>\
					<div class="terms">\
						By clicking you accept <a href="/terms" target="_blank">Terms &amp; Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>.\
					</div>\
				',
				className: 'vex-theme-likeastore',
				showCloseButton: true,
				afterOpen: function () {
					ls.auth.init();
				}
			});
		});
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