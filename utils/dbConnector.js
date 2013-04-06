/**
 * Mongodb connector
 */
var config = require('../config')();
var mongo = require('mongojs');

// specify app collections here
var collections = ['subscribers'];

// get db with default collections list
var db = mongo.connect(config.connection, collections);

// overwrite collections if needed
var setDb = function (collections) {
	return mongo.connect(config.connection, [collections]);
};

module.exports = {
	db: db,
	setDb: setDb
};