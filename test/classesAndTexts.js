/*
 * Common css classes and texts used in e2e tests
 * (if you some class somewhere more then once, please add it here)
 */

exports.classes = function () {
	return {
		homePageLoginBtn: '.go-to-login',
		homePageRegisterBtn: '.register-btn',
		loginPage: '.login-page',
		registerPage: '.register-page',
		loginSubmitBtn: '.do-login-btn',
		registerSubmitBtn: '.do-register-btn',
		notifySubmitBtn: '.do-subscribe-btn'
	};
};

exports.texts = function () {
	return {
		username: 'Username is empty or contains not allowed symbols!',
		email: 'Your email looks incorrect!',
		password: 'Password is empty or contains not allowed symbols!',
		passwordServerError: 'Sorry, this password does not match another fields.',
		subscribeSuccess: 'You have been subscribed successfully!'
	};
};
