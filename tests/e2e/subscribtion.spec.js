
xdescribe('email subscribtion flow', function () {
	before(function () {
		// get spooky for current spec context
		// get valid config (url from cli, prod or dev, maybe screenshots activation)
	});

	describe('when user is on welcome page', function () {

		it('should contain form with valid action');

		it('should contain notify field');

		it('should contain notify button');

		describe('when user submits incorrect data', function () {
			describe('when field is empty', function () {
				it('should add error class on form');
				it('should show error message');
			});

			describe('when email is not correct', function () {
				it('should add error class on form');
				it('should show error message');
			});
		});

		describe('when user submits valid data', function () {
			it('should remove error class on form');
			it('should show success message');
		});
	});

	after(function () {
		// destroy spooky
	});
});