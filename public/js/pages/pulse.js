(function (exports, undefined) {
	'use strict';

	exports.ls.pulse = new Vue({
		el: 'body',

		data: {},

		directives: {
			tooltip: function () {
				this.el.className += ' tooltipped';
				this.el.innerHTML += '<div class="tooltip">' + this.expression + '</div>';
			}
		},

		methods: {
			shareOnFacebook: function (e) {
				e.preventDefault();
				var text = 'http://www.facebook.com/share.php?u=' + e.currentTarget.getAttribute('data-text');
				window.open(text, 'Share', 'width=600,height=400,resizable=yes');
			},

			shareOnTwitter: function (e) {
				e.preventDefault();
				var text = 'http://twitter.com/share?text=' + e.currentTarget.getAttribute('data-text');
				window.open(text, 'Share', 'width=600,height=400,resizable=yes');
			},

			checkImageLoad: function () {
				debugger;
			}
		}
	});

})(window);
