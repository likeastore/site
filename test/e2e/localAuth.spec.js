describe('local user auth flow #auth #e2e', function () {
	var config = require('likeastore-config');
	var classes = require('../classesAndTexts').classes();
	var texts = require('../classesAndTexts').texts();
	var browser;

	before(function () {
		browser = new Zombie();
		browser.silent = true;
	});

	describe('when user is on welcome page', function () {
		before(function (done) {
			browser.visit(config.siteUrl, function () {
				done();
			});
		});

		it('should contain login button', function () {
			browser.query(classes.homePageLoginBtn).should.be.ok;
		});

		it('should contain register button', function () {
			browser.query(classes.homePageRegisterBtn).should.be.ok;
		});

		describe('when user clicks on register button', function () {
			before(function (done) {
				browser.clickLink(classes.homePageRegisterBtn, function () {
					done();
				});
			});

			it('should move to the /register', function () {
				browser.query(classes.registerPage).should.be.ok;
			});

			describe('when user submits incorrect data', function () {
				describe('when fields are empty', function () {
					before(function (done) {
						browser.pressButton(classes.registerSubmitBtn, function () {
							done();
						});
					});

					it('should add error class on first form field', function () {
						browser.query('form.register .username').className.should.include('error');
					});

					it('should show error message', function () {
						browser.text('form.register .msg').should.include(texts.username);
					});
				});

				describe('when username contains not allowed symbols', function () {
					before(function (done) {
						browser
							.fill('username', 'текст')
							.pressButton(classes.registerSubmitBtn, function () {
								done();
							});
					});

					it('should add error class on username field', function () {
						browser.query('form.register .username').className.should.include('error');
					});

					it('should show error message', function () {
						browser.text('form.register .msg').should.include(texts.username);
					});
				});

				describe('when email is not correct', function () {
					before(function (done) {
						browser
							.fill('username', 'tester1')
							.fill('email', 'aaa@')
							.pressButton(classes.registerSubmitBtn, function () {
								done();
							});
					});

					it('should add error class on email field', function () {
						browser.query('form.register .email').className.should.include('error');
					});

					it('should show error message', function () {
						browser.text('form.register .msg').should.include(texts.email);
					});
				});

				describe('when password contains not allowed symbols', function () {
					before(function (done) {
						browser
							.fill('username', 'tester1')
							.fill('email', 'tester1@likeastore.com')
							.fill('password', 'текст')
							.pressButton(classes.registerSubmitBtn, function () {
								done();
							});
					});

					it('should add error class on password field', function () {
						browser.query('form.register .password').className.should.include('error');
					});

					it('should show error message', function () {
						browser.text('form.register .msg').should.include(texts.password);
					});
				});
			});

			describe('when user submits valid data', function () {
				before(function (done) {
					browser
						.fill('username', 'tester1')
						.fill('email', 'tester1@likeastore.com')
						.fill('password', 'qwerty')
						.pressButton(classes.registerSubmitBtn, function () {
							done();
						});
				});

				it('should register new user and redirect to the app', function () {
					browser.location.href.indexOf(config.applicationUrl + '/').should.equal(0);
				});

				describe('when start to login user clicks on login button', function () {
					before(function (done) {
						browser.visit(config.siteUrl, function () {
							done();
						});
					});

					before(function (done) {
						browser.clickLink(classes.homePageLoginBtn, function () {
							done();
						});
					});

					it('should move to the /login', function () {
						browser.query(classes.loginPage).should.be.ok;
					});

					describe('when user submits incorrect data', function () {
						describe('when all fields are empty', function () {
							before(function (done) {
								browser.pressButton(classes.loginSubmitBtn, function () {
									done();
								});
							});

							it('should add error class on first form field', function () {
								browser.query('form.login .username').className.should.include('error');
							});

							it('should show error message', function () {
								browser.text('form.login .msg').should.include(texts.username);
							});
						});

						describe('when username contains not allowed symbols', function () {
							before(function (done) {
								browser
									.fill('username', 'текст')
									.pressButton(classes.loginSubmitBtn, function () {
										done();
									});
							});

							it('should add error class on username field', function () {
								browser.query('form.login .username').className.should.include('error');
							});

							it('should show error message', function () {
								browser.text('form.login .msg').should.include(texts.username);
							});
						});

						describe('when password contains not allowed symbols', function () {
							before(function (done) {
								browser
									.fill('username', 'tester1')
									.fill('password', 'текст')
									.pressButton(classes.loginSubmitBtn, function () {
										done();
									});
							});

							it('should add error class on password field', function () {
								browser.query('form.login .password').className.should.include('error');
							});

							it('should show error message', function () {
								browser.text('form.login .msg').should.include(texts.password);
							});
						});
					});

					describe('when user logins with wrong credentials', function () {
						before(function (done) {
							browser
								.fill('username', 'tester1')
								.fill('password', 'qwertywrong')
								.pressButton(classes.loginSubmitBtn, function () {
									done();
								});
						});

						it('should add error class on password field', function () {
							browser.query('form.login .password').className.should.include('error');
						});

						it('should show error message', function () {
							browser.text('form.login .msg').should.include(texts.passwordServerError);
						});
					});

					describe('when user submits valid data', function () {
						before(function (done) {
							browser
								.fill('username', 'tester1')
								.fill('password', 'qwerty')
								.pressButton(classes.loginSubmitBtn, function () {
									done();
								});
						});

						it('should redirect to the app', function () {
							browser.location.href.indexOf(config.applicationUrl + '/').should.equal(0);
						});
					});
				});
			});
		});
	});

	after(function () {
		browser.close();
	});
});