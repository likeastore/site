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

		$form.removeClass('error');
		$form.find('.msg').remove();

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
			.error(function (err) {
				var data = $.parseJSON(err.responseText);
				handleErrors($('.' + data.field), data.message);
			});

		function handleErrors ($field, message) {
			$field.addClass('error');
			$form.append('<div class="msg error-msg">' + message + '</div>');
		}
	}
};

$(function () {
	ls.auth.init();
});