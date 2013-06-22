var _ = require('underscore');
var grvtr = require('grvtr');
var util = require('util');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = require('mongojs').ObjectId;
var db = require('./dbConnector').db;

/**
 * (!) NOTA BENE: (remove when we'll enable schema)
 * Differences between third-party user and local one:
 * {
 *   "id" : 123,                      - number id on third-party service ("123" - string number on facebook (wtf?));
 *   "username" : "smith",            - username string on third-party service (UNCHANGEABLE);
 *   "displayName" : "Alan Smith",    - third-party full name string;
 *   "token" : "250538..",            - string number provided by third-party service;
 *   "tokenSecret" : "uTedLDT..",     - additional and optional string number provided by third-party service;
 *   "firstTimeUser" : true,          - checks third-party service user added email and name (!, not username);
 *   "avatar" : "http://twim.png",    - avatar url string;
 *   "email": "a@a.co"                - valid email string (unique, third-party users specify on setup);
 *   "name" : "smithy",               - likeastore app name (unique, third-party users specify on setup);
 *   "password" : "smithy",           - local password (unique);
 *   "registered" : ISODate(".."),    - date of registration;
 *   "provider" : "twitter",          - type of registration;
 *   "_id" : ObjectId("100")          - mongodb object id;
 * }
 */

exports.findOrCreateByService = function (token, tokenSecret, profile, callback) {
	var metaFromServices = ['id', 'provider', 'username', 'displayName'];

	db.users.findOne({ id: profile.id, username: profile.username, provider: profile.provider }, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user) {
			return callback(null, user);
		}

		var meta = _.pick(profile, metaFromServices);
		var avatar = profile._json.avatar_url || profile._json.profile_image_url || util.format('http://graph.facebook.com/%s/picture', meta.id);

		var record = _.extend(meta, {
			token: token,
			tokenSecret: tokenSecret,
			avatar: avatar,
			registered: new Date(),
			firstTimeUser: true
		});

		db.users.save(record, function (err, saved) {
			if (err || !saved) {
				return callback(err);
			}
			callback(null, saved);
		});
	});
};

exports.findOrCreateLocal = function (data, callback) {
	db.users.findOne({ $or: [{ name: data.username }, { email: data.email }] }, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user) {
			if (user.provider !== 'local') {
				return callback({ field: 'username', message: 'Sorry, such username is already registered via ' + user.provider + ' .' });
			}

			bcrypt.compare(data.password, user.password, function (err, valid) {
				if (err) {
					return(err);
				}

				if (!valid) {
					return callback({ field: 'password', message: 'Sorry, this password does not match another fields.' });
				}

				return callback(null, user);
			});
		} else {
			if (!data.email) {
				return callback({ field: 'username', message: 'Sorry, there is no user with such username.' });
			}

			var avatar = grvtr.create(data.email, { defaultImage: 'mm' });
			var record = {
				name: data.username,
				email: data.email,
				avatar: avatar,
				provider: 'local',
				registered: new Date()
			};

			bcrypt.genSalt(10, function (err, salt) {
				if (err) {
					return callback(err);
				}

				bcrypt.hash(data.password, salt, null, function (err, hash) {
					if (err) {
						return callback(err);
					}

					record.password = hash;
					db.users.save(record, function (err, saved) {
						if (err) {
							return callback(err);
						}
						return callback(null, saved);
					});
				});
			});
		}
	});
};

exports.setupServiceUser = function (userId, data, callback) {
	db.users.findOne({ _id: { $ne: new ObjectId(userId) }, $or: [{ name: data.username }, { email: data.email }] }, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user && user.name === data.username) {
			return callback({ field: 'username', message: 'User with such username already exists.' });
		}

		if (user && user.email === data.email) {
			return callback({ field: 'email', message: 'User with such email already exists.' });
		}

		db.users.update(
			{ _id: new ObjectId(userId) },
			{ $set: { name: data.username, email: data.email }, $unset: { firstTimeUser: 1 }},
			updatedUser);

		function updatedUser (err) {
			if (err) {
				return callback(err);
			}
			callback(null);
		}
	});
};
