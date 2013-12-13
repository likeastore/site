/*
 * Common forms module (registration, login, subscription)
 */

ls.auth = {

	init: function () {
		$('.field').focus(function (e) {
			$(e.target).removeClass('error');
		});

		$('.formular').submit(this.send.bind(this));
	},

	send: function (e) {
		e.stop();

		var $form = $(e.target);
		var $name = $form.find('.username');
		var $email = $form.find('.email');
		var $pass = $form.find('.password');

		$form.find('.error').removeClass('error');
		$form.find('.error-msg').removeClass('on');

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

		$.post($form.attr('action'), $form.serializeObject())
			.done(function (res) {
				if (res.applicationUrl) {
					window.location = res.applicationUrl;
				}
				$form.find('.error').removeClass('error');
				handleResponse('success', res.message, $('.' + res.field));

			})
			.fail(function (err) {
				var data = $.parseJSON(err.responseText);
				handleResponse('error',  data.message, $('.' + data.field));
			});

		function handleResponse (type, message, $field) {
			var $msg = $form.find('.msg');

			if (type === 'error') {
				$field.addClass(type);
			}

			$msg.addClass(type + '-msg on')
				.end()
				.find('.msg-text')
				.text(message);

			setTimeout(function () {
				$msg.removeClass(type + '-msg on');
			}, 4000);
		}
	}
};

$(function () {
	ls.auth.init();
});