describe('email subscribtion flow #notify #e2e', function () {
	var browser;

	var classes = {
		notifySubmitBtn: '.do-subscribe-btn'
	};

	before(function () {
		browser = new Browser();
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

				it('should add error class on form', function () {
					browser.query('form.subscribe').className.should.include('error');
				});

				it('should show error message', function () {
					browser.query('form.subscribe .error-msg').should.be.ok;
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

				it('should add error class on form', function () {
					browser.query('form.subscribe').className.should.include('error');
				});

				it('should show error message', function () {
					browser.query('form.subscribe .error-msg').should.be.ok;
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

			it('should add error class on form', function () {
				browser.query('form.subscribe').className.should.not.include('error');
			});

			it('should show success message', function () {
				browser.query('form.subscribe .success-msg').should.be.ok;
			});
		});
	});

	after(function () {
		browser.close();
	});
});