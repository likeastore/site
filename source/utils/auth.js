var services = require('likeastore-config').services;
var users = require('../db/users.js');
var TwitterAuth = require('passport-twitter').Strategy;
var GithubAuth = require('passport-github').Strategy;
var FacebookAuth = require('passport-facebook').Strategy;
var StackAuth = require('passport-stackexchange').Strategy;
var LocalAuth = require('passport-local').Strategy;

module.exports = function (passport) {

	var findOrCreateServiceUser = function (token, tokenSecret, profile, done) {
		users.findOrCreateByService(token, tokenSecret, profile, function (err, user) {
			if (err) {
				return done(err);
			}
			done(null, user);
		});
	};

	var findOrCreateLocalUser = function (req, name, pass, done) {
		users.findOrCreateLocal(req.body, function (err, user) {
			if (err) {
				return done(err);
			}
			done(null, user);
		});
	};

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	passport.use(new TwitterAuth({
		consumerKey: services.twitter.consumerKey,
		consumerSecret: services.twitter.consumerSecret,
		callbackURL: '/auth/twitter/callback'
	}, findOrCreateServiceUser));

	passport.use(new GithubAuth({
		clientID: services.github.appId,
		clientSecret: services.github.appSecret,
		callbackURL: '/auth/github/callback',
		customHeaders: { 'User-Agent': 'likeastore' }
	}, findOrCreateServiceUser));

	passport.use(new FacebookAuth({
		clientID: services.facebook.appId,
		clientSecret: services.facebook.appSecret,
		callbackURL: '/auth/facebook/callback'
	}, findOrCreateServiceUser));

	passport.use(new LocalAuth({
		passReqToCallback: true
	}, findOrCreateLocalUser));
};
