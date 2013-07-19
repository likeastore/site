describe('facebook authenticate flow #facebook #e2e', function () {
	var config = require('../../config');
	var browser;

	before(function () {
		browser = new Zombie();
		browser.silent = true;
	});

	describe('when user is on login page', function () {
		before(function (done) {
			browser.visit(config.siteUrl, function () {
				done();
			});
		});

		before(function (done) {
			browser.clickLink('.go-to-login', function () {
				done();
			});
		});

		it('should have facebook auth link', function () {
			browser.query('.facebook').should.be.ok;
		});

		describe('when user clicks facebook auth link', function () {
			before(function (done) {
				browser.clickLink('.facebook', function () {
					done();
				});
			});

			it('should redirect to facebook login site', function () {
				browser.location.href.should.include('https://www.facebook.com/login');
			});

			describe('when user submits valid facebook credentials', function () {
				before(function (done) {
					browser
						.fill('email', 'likeastore7@gmail.com')
						.fill('pass', 'likeman7')
						.pressButton('login', function () {
							done();
						});
				});

				it('should follow redirects through facebook authenticate', function () {
					browser.location.href.should.include('https://www.facebook.com/login');
				});

				it('should not be failed by errors', function () {
					browser.location.href.should.not.include('error');
				});
			});
		});
	});

	after(function () {
		browser.close();
	});
});