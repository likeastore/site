module.exports = function (req) {
	var mongo = req.mongo;

	return {
		save: function (record, collection, callback) {
			mongo.collection(collection).insert(record, callback);
		},
		find: function(query, collection, callback) {
			mongo.collection(collection).findOne(query, callback);
		}
	};
};