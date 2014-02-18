(function (exports, undefined) {
	'use strict';

	exports.ls.resetPassword = new Vue({
		el: '#reset',

		data: {
			user: {
				email: '',
				password: '',
				request: ''
			},
			status: 'Change password',
			success: '',
			error: false
		},

		ready: function () {
			this.$data.user.email = document.getElementsByName('email')[0].value;
			this.$data.user.request = document.getElementsByName('request')[0].value;
		},

		methods: {
			submitForm: function (event) {
				event.preventDefault();

				var passwordRegex = /^[0-9A-z-_.+=@!#()&%?]+$/;
				var data = this.$data;
				var user = data.user;

				data.error = false;

				if (!passwordRegex.test(user.password)) {
					data.error = 'Password is empty or contains not allowed symbols!';
					return;
				}

				data.status = 'Changing..';
				rqst.post({ url: '/resetpassword', body: user }, function (err, res, body) {
					data.status = 'Change password';

					if (res.statusCode >= 400) {
						data.error = body.message;
						return;
					}
					data.success = body.message;
				});
			}
		}
	});

})(window);
