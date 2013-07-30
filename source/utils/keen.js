var config = require('../../config');
var keen = require('keen.io');

module.exports = keen.configure({
    projectId: '51f7abf2897a2c669f000005',
    writeKey: config.keen.writeKey
});