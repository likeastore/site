var config = require('likeastore-config');
var services = config.services;
var users = require('../db/users.js');
var TwitterAuth = require('passport-twitter').Strategy;
var GithubAuth = require('passport-github').Strategy;
var FacebookAuth = require('passport-facebook').Strategy;

exports.init = function (passport) {

	var findOrCreateServiceUser = function (token, tokenSecret, profile, done) {
		users.findOrCreateByService(token, tokenSecret, profile, function (err, user) {
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
		callbackURL: config.siteUrl + '/auth/twitter/callback'
	}, findOrCreateServiceUser));

	passport.use(new GithubAuth({
		clientID: services.github.appId,
		clientSecret: services.github.appSecret,
		callbackURL: config.siteUrl + '/auth/github/callback',
		customHeaders: { 'User-Agent': 'likeastore' }
	}, findOrCreateServiceUser));

	passport.use(new FacebookAuth({
		clientID: services.facebook.appId,
		clientSecret: services.facebook.appSecret,
		callbackURL: config.siteUrl + '/auth/facebook/callback'
	}, findOrCreateServiceUser));

};

exports.localUserSession = function (req, res, next) {
	if (req.session.localUser) {
		req.user = req.session.localUser;
	}
	next();
};
