/* global ls: true */

ls.auth = {

	init: function () {
		$('.auth').submit(this.send.bind(this));
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
			handleErrors($name, 'Username is empty or contains not allowed symbols!');
			return;
		}

		if (!$email.validate()) {
			handleErrors($email, 'Your email looks incorrect!');
			return;
		}

		if (!$pass.validate()) {
			handleErrors($pass, 'Password is empty or contains not allowed symbols!');
			return;
		}

		$.post($form.attr('action'), $form.serializeObject())
			.done(function (res) {
				window.location = res.applicationUrl;
			})
			.fail(function (err) {
				var data = $.parseJSON(err.responseText);
				handleErrors($('.' + data.field), data.message);
			});

		function handleErrors ($field, message) {
			var msg = $form.find('.error-msg'), hide;

			$field.addClass('error');
			msg.addClass('on').end().find('.msg-text').text(message);

			hide = setTimeout(function () {
				msg.removeClass('on');
			}, 4000);
		}
	}
};

$(function () {
	ls.auth.init();
});