
/**
 * Module dependencies.
 */

var express = require('express');
var partials = require('express-partials');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var config = require('./config').config;

// For Cloud foundry
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost'); 

var app = express();

app.engine('.html', require('ejs').__express);

app.configure(function(){
    app.set('port', port);
    app.set('host', host);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(partials());
    app.use(express.session({
      secret: config.session_secret
    }));
    app.use(express.csrf()); 
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
    // custom middleware
    app.use(require('./controllers/sign').auth_user);
     
});

app.locals({
  config: config,
  csrf: function (req, res) {
    return req.session ? req.session._csrf : '';
  }
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// routes
routes(app);

if (process.env.MODE_ENV !== 'test') {  
  http.createServer(app).listen(app.get('port'), app.get('host'), function(){
    console.log("Express server listening on port " + app.get('port'));
  }); 
}

module.exports = app;
