/**
 * All suite global before and after
 */
before(function () {
	console.log(process.env.NODE_ENV);
	require('../../bin/cleanDb.js');
});

after(function () {
	require('../../bin/cleanDb.js');
});
