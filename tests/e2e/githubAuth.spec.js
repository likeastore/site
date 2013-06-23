
xdescribe('github authenticate flow', function () {
	before(function () {
		// get spooky for current spec context
		// get valid config (url from cli, prod or dev, maybe screenshots activation)
	});

	describe('when user is on login page', function () {

		it('should have github auth link');

		describe('when user clicks github auth link', function () {
			it('should redirect to github login site');

			describe('when user submits valid github credentials', function () {
				it('should redirect to the app');
			});
		});
	});

	describe('when user is on register page', function () {

		it('should have github auth link');

		describe('when user clicks github auth link', function () {
			it('should redirect to github login site');

			describe('when user submits valid github credentials', function () {
				it('should redirect to the app');
			});
		});
	});

	after(function () {
		// destroy spooky
	});
});