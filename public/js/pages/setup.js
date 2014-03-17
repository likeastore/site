(function (exports, undefined) {
	'use strict';

	exports.ls.setup = new Vue({
		el: '#setup',

		data: {
			user: {
				email: '',
				username: ''
			},
			provider: '',
			accountSuggest: false,
			error: false
		},

		ready: function () {
			this.$data.user.username = document.getElementsByName('nameSuggest')[0].value;
			this.$data.provider = document.getElementsByName('provider')[0].value;
		},

		methods: {
			submitForm: function (event) {
				event.preventDefault();

				var usernameRegex =  /^[0-9A-z-_.+=@!#()&%?]+$/;
				var emailRegex = /^[\w\._%\+\-]+@(?:[\w\-]+\.)+[A-Za-z]{2,6}$/i;
				var data = this.$data;
				var user = data.user;

				data.error = false;

				if (!usernameRegex.test(user.username)) {
					data.error = 'Username is empty or contains not allowed symbols!';
					return;
				}

				if (!emailRegex.test(user.email) && data.provider !== 'local') {
					data.error = 'Whoops! Your email looks incorrect!';
					return;
				}

				if (data.provider === 'local') {
					delete user.email;
				}

				rqst.post({ url: '/auth/setup', body: user }, function (err, res, body) {
					if (res.statusCode >= 400) {
						data.error = body.message;

						if (body.user) {
							var user = body.user;
							data.accountSuggest = '<img src="' + user.avatar + '" class="left">' +
								'<span>Email is already registered. ' + (user.displayName || user.name) + ', is it you?' +
								'You can sign in with <b>' + user.provider + '</b> account.</span>';
						}

						return;
					}

					window.location = body.applicationUrl;
				});
			}
		}
	});

})(window);
