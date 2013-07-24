var express = require('express');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var passport = require('passport');
var authorize = require('./source/utils/auth.js');

// (!) auth init should be ALWAYS before app
authorize.init(passport);
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('ejs', engine);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'likeastore_marketing' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(authorize.localUserSession);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

app.configure('staging', function () {
  app.use(express.basicAuth(config.access.user, config.access.password));
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

app.configure('production', function() {
  app.use(express.logger('short'));
  app.use(express.errorHandler());
});

require('./source/api.js')(app, passport);
require('./source/router.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;