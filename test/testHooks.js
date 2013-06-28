global.config = require('likeastore-config');
global.should = require('should');
global.Browser = require('zombie');

global.texts = {
	username: 'Username is empty or contains not allowed symbols!',
	email: 'Your email looks incorrect!',
	password: 'Password is empty or contains not allowed symbols!',
	passwordServerError: 'Sorry, this password does not match another fields.',
	subscribeSuccess: 'You have been subscribed successfully!'
};

global.classes = {
	homePageLoginBtn: '.go-to-login',
	homePageRegisterBtn: '.register-btn',
	loginPage: '.login-page',
	registerPage: '.register-page',
	loginSubmitBtn: '.do-login-btn',
	registerSubmitBtn: '.do-register-btn',
	notifySubmitBtn: '.do-subscribe-btn'
};