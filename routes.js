/*!
 * driver-test - route.js
 * Copyright(c) 2012 huangjian<hj1986@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
 
var sign = require('./controllers/sign');
var site = require('./controllers/site');
var user = require('./controllers/user');
var message = require('./controllers/message');
var static = require('./controllers/static');
var status = require('./controllers/status');

module.exports = function (app) {
  // home page
  app.get('/', site.index);

  // sign up, login, logout
  app.get('/signup', sign.signup);
  app.post('/signup', sign.signup);
  app.get('/signout', sign.signout);
  app.get('/signin', sign.showLogin);
  app.post('/signin', sign.login);

  // password
  app.get('/search_pass', sign.search_pass);
  app.post('/search_pass', sign.search_pass);
  app.get('/reset_pass', sign.reset_pass);
  app.post('/reset_pass', sign.reset_pass);

  // user
  app.get('/user/:name', user.index);
  app.get('/setting', user.setting);
  app.post('/setting', user.setting);
  app.get('/stars', user.show_stars);
  app.get('/users/top100', user.top100);
  app.get('/my/messages', message.index);
  app.get('/user/:name/achivement', user.list_topics);
  app.post('/user/set_seller', user.toggle_seller);
   
  // message
  app.post('/messages/mark_read', message.mark_read);
  app.post('/messages/mark_all_read', message.mark_all_read);

  // static
  app.get('/about', static.about);

  // site status
  app.get('/status', status.status);

};  
