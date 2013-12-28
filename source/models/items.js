var config = require('../../config');
var db = require('../db')(config);

function findById(id, callback) {
	db.items.findOne({_id: new db.ObjectId(id)}, callback);
}

module.exports = {
	findById: findById
};