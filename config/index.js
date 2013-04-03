var local = require('./production.config.js');

function createConfig() {
	console.log(local);

	return local;
}

module.exports = createConfig;