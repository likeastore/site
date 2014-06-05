(function (exports, undefined) {
	'use strict';

	exports.ls.landing = new Vue({
		el: '.dev-land-page',

		methods: {
			playVideo: function () {
				vex.open({
					content:'<iframe width="100%" height="100%"\
						src="//www.youtube.com/embed/1AT09OHUiqI?autoplay=1&rel=0&hd=1&showinfo=0&autohide=1"\
						frameborder="0" allowfullscreen></iframe>',
					className: 'lsd-theme video-dialog',
					showCloseButton: false,
					afterOpen: function () {
						ls.analytics.track('promo-watched');
						mixpanel.track('promo watched');
					}
				});
			}
		}
	});

})(window);
