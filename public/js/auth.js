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
			handleErrors($name, 'Username contains not allowed symbols!');
			return;
		}

		if (!$email.validate()) {
			handleErrors($email, 'Your email looks incorrect!');
			return;
		}

		if (!$pass.validate()) {
			handleErrors($pass, 'Password contains not allowed symbols!');
			return;
		}

		$.post($form.attr('action'), $form.serializeObject())
			.done(function (res) {
				window.location = res.applicationUrl;
			})
			.fail(function (err, response) {
				handleErrors($('.' + err.field), err.message);
			});

		function handleErrors ($field, message) {
			var value = $field.val();
			var msg = value.length < 1 ? 'This field is empty..' : message;

			$field.addClass('error');
			$form.append('<div class="msg error-msg">' + msg + '</div>');
		}
	}

};

$(function () {
	ls.auth.init();
});