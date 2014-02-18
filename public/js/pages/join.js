(function (exports, undefined) {
	'use strict';

	exports.ls.join = new Vue({
		el: '#join',

		data: {
			user: {
				email: '',
				password: ''
			},
			errors: {
				msg: '',
				email: false,
				password: false
			}
		},

		methods: {
			submitForm: function (event) {
				event.preventDefault();

				var emailRegex = /^[\w\._%\+\-]+@(?:[\w\-]+\.)+[A-Za-z]{2,6}$/i;
				var passwordRegex = /^[0-9A-z-_.+=@!#()&%?]+$/;
				var data = this.$data;
				var user = data.user;

				data.errors = {};

				if (!emailRegex.test(user.email)) {
					data.errors.email = true;
					data.errors.msg = 'Whoops! Your email looks incorrect!';
					return;
				}

				if (!passwordRegex.test(user.password)) {
					data.errors.password = true;
					data.errors.msg = 'Password is empty or contains not allowed symbols!';
					return;
				}

				rqst.post({ url: '/auth/local/login', body: user }, function (err, res, body) {
					if (res.statusCode >= 400) {
						data.errors[body.field] = true;
						data.errors.msg = body.message;
						return;
					}

					window.location = body.applicationUrl;
				});
			},

			resetFields: function () {
				this.$data.errors.email = false;
				this.$data.errors.password = false;
			}
		}
	});

})(window);
