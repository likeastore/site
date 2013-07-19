describe('twitter authenticate flow #twitter #e2e', function () {
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

		it('should have twitter auth link', function () {
			browser.query('.twitter').should.be.ok;
		});

		describe('when user clicks twitter auth link', function () {
			before(function (done) {
				browser.clickLink('.twitter', function () {
					done();
				});
			});

			it('should redirect to twitter login site', function () {
				browser.location.href.should.include('https://api.twitter.com/oauth/authenticate');
			});

			describe('when user submits valid twitter credentials', function () {
				before(function (done) {
					browser
						.fill('#username_or_email', 'likeman77')
						.fill('#password', 'likeman7')
						.pressButton('#allow', function () {
							done();
						});
				});

				it('should follow redirects through twitter authenticate', function () {
					browser.location.href.should.include('https://api.twitter.com/oauth/authenticate');
				});

				it('should show success message', function () {
					browser.text('.happy.notice').should.include('Redirecting you back to the application.');
				});
			});
		});
	});

	after(function () {
		browser.close();
	});
});