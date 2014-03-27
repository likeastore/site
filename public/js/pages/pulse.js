(function (exports, $, undefined) {
	'use strict';

	exports.ls.pulse = new Vue({
		el: 'body',

		data: {},

		directives: {
			vex: function () {
				var vue = this.vm;
				$(this.el).on('click', function (e) {
					e.preventDefault();
					vue.initShareItemDialog($(this));
				});
			},

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

			initShareItemDialog: function (elem) {
				var self = this;
				var base = window.appConfig.siteUrl + '/s';
				var salt = window.appConfig.hashids.salt;
				var hashids = new Hashids(salt);
				var link = base + '/' + hashids.encryptHex(elem.data('id'));

				vex.open({
					content:
						'<h2 class="bar">Share your favorite</h2>' +
						'<div class="social-desc">Press Ctrl+C or Cmd+C to copy this link</div>' +
						'<input id="likeUrl" class="fld" value="' + link + '">' +
						'<div class="social-share">' +
							'<button type="button" class="btn big-btn fb-btn" data-text="' + link +'">Share on facebook</button>' +
							'<button type="button" class="btn big-btn tw-btn" data-text="' + elem.data('title') + ' on @' + elem.data('type') + ' - ' + link +', shared via @likeastore">Share on twitter</button>' +
						'</div>',
					className: 'lsd-theme share-dialog share-like',
					showCloseButton: false,
					afterOpen: function () {
						ls.analytics.track('share-like');
						mixpanel.track('like shared', { page: 'pulse' });

						$('.fb-btn').on('click', self.shareOnFacebook);
						$('.tw-btn').on('click', self.shareOnTwitter);

						setTimeout(function () {
							document.getElementById('likeUrl').select();
						}, 100);
					}
				});
			}
		}
	});

})(window, window.jQuery);
