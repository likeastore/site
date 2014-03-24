process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config');
var pulse = require('./pulse');

var db = require('../source/db')(config);

db.pulse.drop();

db.pulse.insert(pulse, function (err) {
	if (err) {
		console.dir(err);
		process.exit(1);
	}
	console.info('success!');
	process.exit(0);
});
