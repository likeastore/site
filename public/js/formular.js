/* jshint multistr: true */
/*
 * Common forms module (registration, login, subscription)
 */

ls.auth = {

	hideTimer: null, // control error messages show/hide

	init: function () {
		$('.field').focus(function (e) {
			$(e.target).removeClass('error');
		});

		$('.formular').submit(this.send.bind(this));
	},

	send: function (e) {
		e.stop();

		var self = this;
		var $form = $(e.target);
		var $name = $form.find('.username');
		var $email = $form.find('.email');
		var $pass = $form.find('.password');
		var $button = $form.find('button[type="submit"]');
		var originalBtnText = $button.text();

		$form.find('.error').removeClass('error');
		$form.find('.error-msg').removeClass('on');
		$form.find('.user-suggest').removeClass('user-suggest');

		if (!$name.validate()) {
			handleResponse('error', 'Username is empty or contains not allowed symbols!', $name);
			return;
		}

		if (!$email.validate()) {
			handleResponse('error', 'Your email looks incorrect!', $email);
			return;
		}

		if (!$pass.validate()) {
			handleResponse('error', 'Password is empty or contains not allowed symbols!', $pass);
			return;
		}

		$button.text(($button.data('progress-text') || 'Sending'));

		$.post($form.attr('action'), $form.serializeObject())
			.done(function (res) {
				if (res.applicationUrl) {
					window.location = res.applicationUrl;
				}
				$form.find('.error').removeClass('error');

				handleResponse('success', res.message, $('.' + res.field), res);

				if (self.successInterceptor) {
					self.successInterceptor(res, $form);
				}
			})
			.fail(function (err) {
				var data = $.parseJSON(err.responseText);

				handleResponse('error',  data.message, $('.' + data.field), data);

				if (self.errorInterceptor) {
					self.errorInterceptor(data, $form);
				}
			});

		function handleResponse (type, message, $field, resp) {
			var $msg = $form.find('.msg');

			$button.text(originalBtnText);

			if (type === 'success' && !$msg.hasClass('success')) {
				return;
			}

			if (type === 'error') {
				$field.addClass(type);
			}

			$msg.addClass(type + '-msg on');

			if (resp && resp.user) {
				var user = resp.user;

				clearTimeout(self.hideTimer);

				$msg.addClass('user-suggest');
				$msg.html('\
					<img src="' + user.avatar + '">\
					<span>Email is already registered. ' + (user.displayName || user.name) + ', is it you?\
					You can sign in with <b>' + user.provider + '</b> account.</span>');
			} else {
				$msg.text(message);

				self.hideTimer = setTimeout(function () {
					$msg.removeClass(type + '-msg on');
				}, 8000);
			}
		}
	}
};

$(function () {
	ls.auth.init();
});