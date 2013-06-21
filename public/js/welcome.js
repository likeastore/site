/* global ls: true */

ls.welcomePage = {

	init: function () {
		$('.subscribe').submit(this.subscribe.bind(this));
		$('input').keydown(this.removeMessages.bind(this));
	},

	subscribe: function (e) {
		e.stop();

		var $form = $(e.target);
		var $email = $form.find('.email');
		var email = $email.val();

		$form.removeClass('error');
		$form.find('.msg').remove();

		if (!$email.validate()) {
			$form.addClass('error');
			$form.append('<div class="msg error-msg">Your email looks strange, please correct.</div>');
			return;
		}

		$.post($form.attr('action'), { email: email })
			.done(function () {
				$form.removeClass('error');
				$form.append('<div class="msm success-msg">You have been subscribed successfully!</div>');
			})
			.fail(function () {
				$form.addClass('error');
				$form.append('<div class="msg error-msg">Oops! Unexpected server error.. Please, try again later.</div>');
			});
	},

	removeMessages: function (e) {
		$('form').find('.msg').remove();
	}
};

$(function () {
	ls.welcomePage.init();
});
