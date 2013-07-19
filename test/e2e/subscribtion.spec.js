describe('email subscribtion flow #notify #e2e', function () {
	var config = require('../../config');
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

		it('should contain subscribe form', function () {
			browser.query('form.subscribe').should.be.ok;
		});

		describe('when user submits incorrect data', function () {
			describe('when field is empty', function () {
				before(function (done) {
					browser.pressButton(classes.notifySubmitBtn, function () {
						done();
					});
				});

				it('should add error class on email field', function () {
					browser.query('form.subscribe .email').className.should.include('error');
				});

				it('should show error message', function () {
					browser.text('form.subscribe .msg').should.include(texts.email);
				});
			});

			describe('when email is not correct', function () {
				before(function (done) {
					browser
						.fill('email', 'tester1@')
						.pressButton(classes.notifySubmitBtn, function () {
							done();
						});
				});

				it('should add error class on email field', function () {
					browser.query('form.subscribe .email').className.should.include('error');
				});

				it('should show error message', function () {
					browser.text('form.subscribe .msg').should.include(texts.email);
				});
			});
		});

		describe('when user submits valid data', function () {
			before(function (done) {
				browser
					.fill('email', 'tester1@likeastore.com')
					.pressButton(classes.notifySubmitBtn, function () {
						done();
					});
			});

			it('should not add error class on email field', function () {
				browser.query('form.subscribe').className.should.not.include('error');
			});

			it('should show success message', function () {
				browser.text('form.subscribe .msg').should.include(texts.subscribeSuccess);
			});
		});
	});

	after(function () {
		browser.close();
	});
});