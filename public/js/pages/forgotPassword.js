(function (exports, undefined) {
	'use strict';

	exports.ls.forgotPassword = new Vue({
		el: '#forgot',

		data: {
			user: {
				email: '',
			},
			status: 'Reset password',
			success: false,
			error: false
		},

		methods: {
			submitForm: function (event) {
				event.preventDefault();

				var emailRegex = /^[\w\._%\+\-]+@(?:[\w\-]+\.)+[A-Za-z]{2,6}$/i;
				var data = this.$data;
				var user = data.user;

				data.error = false;

				if (!emailRegex.test(user.email)) {
					data.error = 'Whoops! Your email looks incorrect!';
					return;
				}

				data.status = 'Sending message';
				rqst.post({ url: '/resetpassword/request', body: user }, function (err, res, body) {
					data.status = 'Reset password';

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
