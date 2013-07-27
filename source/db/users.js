var _ = require('underscore');
var grvtr = require('grvtr');
var util = require('util');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = require('mongojs').ObjectId;
var db = require('./dbConnector').db;
var tokens = require('../utils/tokens');
var notificationUtil = require('../utils/notification');


function sendUserCreatedNotification (user) {
	var title = '[likeastore] New user registered!';
	var message = 'Congrats!\n\nNew user ' + user.email + ' just registered for likeastore. Impress him!';
	notificationUtil.sendEmail(title, message, function () {});
}

/**
 * (!) NOTA BENE: (remove when we'll enable schema)
 * Differences between third-party user and local one:
 * {
 *   "id" : 123,                      - number id on third-party service ("123" - string number on facebook (wtf?));
 *   "username" : "smith",            - username string on third-party service (UNCHANGEABLE);
 *   "displayName" : "Alan Smith",    - third-party full name string;
 *   "token" : "250538..",            - string number provided by third-party service;
 *   "tokenSecret" : "uTedLDT..",     - additional and optional string number provided by third-party service;
 *   "firstTimeUser" : true,          - checks user added email and name or only email for local users (!, not username);
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
		var avatar = profile._json.avatar_url || profile._json.profile_image_url_https || util.format('https://graph.facebook.com/%s/picture', meta.id);

		var record = _.extend(meta, {
			token: token,
			tokenSecret: tokenSecret,
			avatar: avatar,
			registered: new Date(),
			apiToken: tokens.generateApiToken(meta.username),
			firstTimeUser: true
		});

		db.users.save(record, function (err, saved) {
			if (err || !saved) {
				return callback(err);
			}

			sendUserCreatedNotification (saved);

			callback(null, saved);
		});
	});
};

exports.findOrCreateLocal = function (data, callback) {
	db.users.findOne({ email: data.email }, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user) {
			if (!user.password) {
				return callback({ field: 'email', message: 'Sorry, this email is already registered.' });
			}

			bcrypt.compare(data.password, user.password, function (err, valid) {
				if (err) {
					return(err);
				}

				if (!valid) {
					return callback({ field: 'password', message: 'Sorry, this password does not match email field.' });
				}

				return callback(null, user);
			});
		} else {
			var avatar = grvtr.create(data.email, {
				defaultImage: 'mm',
				secure: true
			});

			var record = {
				email: data.email,
				avatar: avatar,
				provider: 'local',
				apiToken: tokens.generateApiToken(data.username),
				registered: new Date(),
				firstTimeUser: true
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

						sendUserCreatedNotification (saved);

						return callback(null, saved);
					});
				});
			});
		}
	});
};

exports.finishUserSetup = function (userId, data, callback) {
	db.users.findOne({ _id: { $ne: new ObjectId(userId) }, name: data.username }, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user && user.name === data.username) {
			return callback({ field: 'username', message: 'User with such username already exists.' });
		}

		if (data.email) {
			db.users.findOne({ _id: { $ne: new ObjectId(userId) }, email: data.email }, function (err, user) {
				if (err) {
					return callback(err);
				}

				if (user && user.email === data.email) {
					return callback({ field: 'email', message: 'User with such email already exists.' });
				}

				saveUser();
			});
		} else {
			saveUser();
		}

		function saveUser () {
			var updateQuery = data.email ? { name: data.username, email: data.email } : { name: data.username };

			db.users.update(
				{ _id: new ObjectId(userId) },
				{ $set: updateQuery, $unset: { firstTimeUser: 1 }},
				function (err) {
					if (err) {
						return callback(err);
					}
					callback(null);
				});
		}
	});
};
