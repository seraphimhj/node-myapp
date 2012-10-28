/*!
 * waiting - site index controller.
 * Copyright(c) 2012 huangjian
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var user_ctrl = require('./user');
var config = require('../config').config;
var EventProxy = require('eventproxy').EventProxy;

exports.index = function (req, res, next) {
  res.render('index', { title: 'Express' });
};
