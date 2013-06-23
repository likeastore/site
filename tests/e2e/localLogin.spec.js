var config = require('likeastore-config');
var should = require('should');
var Browser = require('zombie');

describe('local login flow', function () {
	var browser;

	before(function () {
		browser = new Browser();
	});

	describe('when user is on welcome page', function () {
		var loginButtonClass = '.login-btn';

		before(function (done) {
			browser.visit(config.siteUrl, function () {
				done();
			})
		});

		it('should contain login button', function () {
			browser.query(loginButtonClass).should.be.ok;
		});

		describe('when user clicks on login button', function () {
			before(function (done) {
				browser.clickLink(loginButtonClass, function () {
					done();
				});
			});

			it('should move to the /login', function () {
				browser.query('.login-page').should.be.ok;
			});

			describe('when user submits incorrect data', function () {
				describe('when all fields are empty', function () {
					before(function (done) {
						browser.pressButton('.do-login-btn', function () {
							done();
						});
					});

					it('should add error class on first form field', function () {
						browser.query('form.login .username').className.should.include('error');
					});

					it('should show error message', function () {
						browser.query('form.login .error-msg').should.be.ok;
					});
				});

				describe('when username contains not allowed symbols', function () {
					before(function (done) {
						browser
							.fill('username', 'текст')
							.fill('password', 'qwerty')
							.pressButton('.do-login-btn', function () {
								done();
							});
					});

					it('should add error class on username field', function () {
						browser.query('form.login .username').className.should.include('error');
					});

					it('should show error message', function () {
						browser.query('form.login .error-msg').should.be.ok;
					});
				});

				describe('when password contains not allowed symbols', function () {
					before(function (done) {
						browser
							.fill('username', 'test')
							.fill('password', 'текст')
							.pressButton('.do-login-btn', function () {
								done();
							});
					});

					it('should add error class on password field', function () {
						browser.query('form.login .password').className.should.include('error');
					});

					it('should show error message', function () {
						browser.query('form.login .error-msg').should.be.ok;
					});
				});

				describe('when user submits valid data', function () {
					before(function (done) {
						browser
							.fill('username', 'test')
							.fill('password', 'test')
							.pressButton('.do-login-btn', function () {
								done();
							});
					});

					it('should redirect to the app', function () {
						browser.location.href.should.equal(config.applicationUrl + '/');
					});
				});
			});

			xdescribe('when user logins with credentials that already in use', function () {
				it('should add error class on form');
				it('should show error message');
			});
		});
	});

	after(function () {
	});
});