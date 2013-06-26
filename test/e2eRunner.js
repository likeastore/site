process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.TEST_ENV = process.env.TEST_ENV || 'test';

require('../app');
require('../node_modules/mocha/bin/_mocha');
