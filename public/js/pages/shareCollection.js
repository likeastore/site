(function (exports, undefined) {
	'use strict';

	exports.ls.shareCollection = new Vue({
		el: 'body',

		data: {
			showPopup: false,
			showSidebar: false
		},

		methods: {
			togglePopup: function () {
				this.$data.showPopup = !this.$data.showPopup ? true : false;

				setTimeout(function () {
					document.getElementById('collectionUrl').select();
				}, 100);
			},

			hidePopup: function () {
				this.$data.showPopup = false;
			},

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

			openSidebar: function () {
				this.$data.showSidebar = true;
			},

			hideSidebar: function () {
				this.$data.showSidebar = false;
			}
		}
	});

})(window);
