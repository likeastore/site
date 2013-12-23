var _ = require('underscore');
var grvtr = require('grvtr');
var util = require('util');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = require('mongojs').ObjectId;
var crypto = require('crypto');

var config = require('../../config');
var db = require('../db')(config);
var tokens = require('../utils/tokens');
var notificationUtil = require('../utils/notification');
var analytics = require('../utils/analytics');
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

function findOrCreateByService(token, tokenSecret, profile, callback) {
	var metaFromServices = ['id', 'provider', 'username', 'displayName'];

	db.users.findOne({ id: profile.id, provider: profile.provider }, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user) {
			return callback(null, user);
		}

		if (!profile.username && profile.provider === 'facebook') {
			profile.username = (profile._json.last_name || profile.name.familyName || getRandomName()).toLowerCase();
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

			sendUserCreatedNotification(saved);

			analytics('user registered', {service: profile.provider}, function (err) {
				callback(null, saved);
			});
		});
	});

	function  getRandomName() {
		return 'user' + Math.floor(Math.random()*500 + 1);
	}
}

 function findOrCreateLocal(data, callback) {
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

						sendUserCreatedNotification(saved);

						analytics('user registered', {service: 'local'}, function (err) {
							callback(null, saved);
						});
					});
				});
			});
		}
	});
}

function finishUserSetup(userId, data, callback) {
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

					analytics('user setup account', function (err) {
						callback(null);
					});
				});
		}
	});
}

function resetPasswordRequest(email, callback) {
	var current = new Date();
	var id = crypto.createHash('sha256').update(email + ':' + current.getTime()).digest('hex');
	var request = {id: id, timestamp: current};

	findByEmail(email, function (err, user) {
		if (!user) {
			return callback({message: 'No user with such email found.'});
		}

		if (user.provider !== 'local') {
			return callback({message: 'You used ' + user.provider + ' during registration. Please use it for login.'});
		}

		db.users.findAndModify({
			query: { email: email },
			update: { $set: {resetPasswordRequest: request} },
			'new': true
		}, deleteRequestedPushed);

		function deleteRequestedPushed(err, user) {
			if (err) {
				return callback(err);
			}

			if (!user) {
				return callback({message: 'No user with such email found.'});
			}

			callback(null, request);
		}
	});
}

function findByEmail(email, callback) {
	db.users.findOne({email: email}, function (err, user) {
		if (err || !user) {
			return callback({message: 'No user with such email found.'});
		}

		callback(null, user);
	});
}

function changePassword(email, request, password, callback) {
	findByEmail(email, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (!user.resetPasswordRequest || user.resetPasswordRequest.id !== request) {
			return callback({message: 'Failed to reset password due to wrong request'});
		}

		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return callback(err);
			}

			bcrypt.hash(password, salt, null, function (err, hash) {
				if (err) {
					return callback(err);
				}

				db.users.findAndModify({
					query: { email: email },
					update: { $set: {password: hash} },
					'new': true
				}, callback);
			});
		});
	});
}

function sendUserCreatedNotification (user) {
	var title = '[likeastore] New user registered!';
	var message = 'Congrats!\n\nNew user ' + (user.email || user.username) + ' just registered for likeastore via ' + user.provider + ' registration on' + (process.env.NODE_ENV || 'development') + '. Impress him!';
	notificationUtil.sendEmail(title, message, function () {});
}

module.exports = {
	findOrCreateByService: findOrCreateByService,
	findOrCreateLocal: findOrCreateLocal,
	finishUserSetup: finishUserSetup,
	resetPasswordRequest: resetPasswordRequest,
	findByEmail: findByEmail,
	changePassword: changePassword
};
