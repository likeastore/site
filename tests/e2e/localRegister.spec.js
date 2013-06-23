
xdescribe('local registration flow', function () {
	before(function () {
		// get spooky for current spec context
		// get valid config (url from cli, prod or dev, maybe screenshots activation)
	});

	describe('when user is on welcome page', function () {

		it('should contain register button');

		describe('when user clicks on register button', function () {

			it('should move to the /register');

			describe('when user submits incorrect data', function () {
				describe('when fields are empty', function () {
					it('should add error class on form');
					it('should show error message');
				});

				describe('when username contains not allowed symbols', function () {
					it('should add error class on form');
					it('should show error message');
				});

				describe('when email is not correct', function () {
					it('should add error class on form');
					it('should show error message');
				});

				describe('when password contains not allowed symbols', function () {
					it('should add error class on form');
					it('should show error message');
				})
			});

			describe('when user submits valid data', function () {
				it('should redirect to the app');
			});

			describe('when user registers with credentials that already in use', function () {
				it('should add error class on form');
				it('should show error message');
			});
		});
	});

	after(function () {
		// destroy spooky
	});
});