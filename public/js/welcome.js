var welcomePage = {

	init: function () {
		$('.subscribe').submit(this.subscribe.bind(this));
	},

	subscribe: function (e) {
		e.stop();

		var $form = $(e.target);
		var $email = $form.find('.email');
		var email = $email.val();

		$form.removeClass('error');

		if (!$email.validate()) {
			$form.addClass('error');
			$form.append('<div class="msg error-msg">Your email looks strange, please correct</div>');
			return;
		}

		$.post('/notify', { email: email }, function () {
			$form.append('<div class="msm success-msg">You have been subscribed successfully!</div>');
		});
	}
};

$(function () {
	welcomePage.init();
});
