var models = require('../models');
var User = models.User;
var Message = models.Message;
var Seat = models.Seat;
var message_ctrl = require('./message');
var Util = require('../libs/util');
var config = require('../config').config;
var EventProxy = require('eventproxy').EventProxy;
var check = require('validator').check;
var sanitize = require('validator').sanitize;
var crypto = require('crypto');

exports.index = function (req, res, next) {
  var user_name = req.params.name;
  get_user_by_name(user_name, function (err, user) {
    if (!user) {
      res.render('notify/notify', {error: '这个用户不存在。'});
      return;
    }
    
    var render = function (seats) {
      user.friendly_create_at = Util.format_date(user.create_at, true);
      res.render('user/index', {
        user: user,
        seats: seats
      });
    };

    var proxy = new EventProxy();
    proxy.assign('all_seats', render);

    Seat.find({owner_id: user._id}, function (err, seats) {
      if (err) {
        return next(err);
      }
      proxy.trigger('all_seats', seats);
    });
  });
};

//exports.show_stars = function (req, res, next) {
//  get_users_by_query({is_star: true}, {}, function (err, stars) {
//    if (err) {
//      return next(err);
//    }
//    res.render('user/stars', {stars: stars});
//  });   
//};

exports.setting = function (req, res, next) {
  if (!req.session.user) {
    res.redirect('home');
    return;
  }
  var method = req.method.toLowerCase();
  if (method !== 'post') {
    get_user_by_id(req.session.user._id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (req.query.save === 'success') {
        user.success = '保存成功。';
      }
      user.error = null;
      return res.render('user/setting', user);
    });
    return;
  }
  // post
  var action = req.body.action;
  if (action === 'change_setting') {
    var name = sanitize(req.body.name).trim();      
    name = sanitize(name).xss();
    var email = sanitize(req.body.email).trim();      
    email = sanitize(email).xss();
    var url = sanitize(req.body.url).trim();      
    url = sanitize(url).xss();
    var profile_image_url = sanitize(sanitize(req.body.profile_image_url).trim()).xss();
    var location = sanitize(req.body.location).trim();      
    location = sanitize(location).xss();
    var signature = sanitize(req.body.signature).trim();      
    signature = sanitize(signature).xss();
    var profile = sanitize(req.body.profile).trim();      
    profile = sanitize(profile).xss();
    var weibo = sanitize(req.body.weibo).trim();      
    weibo = sanitize(weibo).xss();
    var receive_at_mail = req.body.receive_at_mail === 'on' ? true: false;
    var receive_reply_mail = req.body.receive_reply_mail === 'on' ? true: false;

    if (url !== '') {
      try {
        if (url.indexOf('http://') < 0) {
          url = 'http://' + url;
        }
        check(url, '不正确的个人网站。').isUrl();
      } catch (e) {
        res.render('user/setting', {
          error: e.message, 
          name: name, 
          email: email, 
          url: url,
          profile_image_url: profile_image_url,
          location: location,
          signature: signature, 
          profile: profile,
          weibo: weibo,
          receive_at_mail: receive_at_mail,
          receive_reply_mail: receive_reply_mail
        });
        return;
      }
    }
    if (weibo) {
      try {
        if (weibo.indexOf('http://') < 0) {
          weibo = 'http://' + weibo;
        }
        check(weibo, '不正确的微博地址。').isUrl();
      } catch (e) {
        res.render('user/setting', {
          error: e.message,
          name: name,
          email: email,
          url: url,
          profile_image_url: profile_image_url,
          location: location,
          signature: signature,
          profile: profile,
          weibo: weibo,
          receive_at_mail: receive_at_mail,
          receive_reply_mail: receive_reply_mail
        });
        return;
      }
    }

    get_user_by_id(req.session.user._id, function (err, user) {
      if (err) {
        return next(err);
      }
      user.url = url;
      user.profile_image_url = profile_image_url;
      user.location = location;
      user.signature = signature;
      user.profile = profile;
      user.weibo = weibo;
      user.receive_at_mail = receive_at_mail;
      user.receive_reply_mail = receive_reply_mail;
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/setting?save=success');
      });
    });

  }
  if (action === 'change_password') {
    var old_pass = sanitize(req.body.old_pass).trim();
    var new_pass = sanitize(req.body.new_pass).trim();

    get_user_by_id(req.session.user._id, function (err, user) {
      if (err) {
        return next(err);
      }
      var md5sum = crypto.createHash('md5');
      md5sum.update(old_pass);
      old_pass = md5sum.digest('hex');

      if (old_pass !== user.pass) {
        res.render('user/setting', {
          error: '当前密码不正确。',
          name: user.name,
          email: user.email,
          url: user.url,
          profile_image_url: user.profile_image_url,
          location: user.location,
          signature: user.signature,
          profile: user.profile,
          weibo: user.weibo,
          receive_at_mail: user.receive_at_mail,
          receive_reply_mail: user.receive_reply_mail
        });
        return;
      }

      md5sum = crypto.createHash('md5');
      md5sum.update(new_pass);
      new_pass = md5sum.digest('hex');

      user.pass = new_pass;
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.render('user/setting', {
          success: '密码已被修改。',
          name: user.name,
          email: user.email,
          url: user.url,
          profile_image_url: user.profile_image_url,
          location: user.location,
          signature: user.signature,
          profile: user.profile,
          weibo: user.weibo,
          receive_at_mail: user.receive_at_mail,
          receive_reply_mail: user.receive_reply_mail
        });
        return;

      });
    });
  }
};

//exports.follow = function (req, res, next) {
//  if (!req.session || !req.session.user) {
//    res.send('forbidden!');
//    return;
//  }
//  var follow_id = req.body.follow_id;
//  get_user_by_id(follow_id, function (err, user) {
//    if (err) {
//      return next(err);
//    }
//    if (!user) {
//      res.json({status: 'failed'});
//    }
//    
//    var proxy = new EventProxy();
//    var done = function () {
//      res.json({ status: 'success' });
//    };
//    proxy.assign('relation_saved', 'message_saved', done);
//    Relation.findOne({user_id: req.session.user._id, follow_id: user._id}, function (err, doc) {
//      if (err) {
//        return next(err);
//      }
//      if (doc) {
//        res.json({ status: 'success' });
//        return;
//      }
//        
//      var relation = new Relation();
//      relation.user_id = req.session.user._id;
//      relation.follow_id = user._id;
//      relation.save();
//      proxy.trigger('relation_saved');
//        
//      get_user_by_id(req.session.user._id, function (err, me) {
//        if (err) {
//          return next(err);
//        }
//        me.following_count += 1;
//        me.save();
//      });
//
//      user.follower_count += 1;
//      user.save();
//
//      req.session.user.following_count += 1;
//    });
//
//    message_ctrl.send_follow_message(follow_id, req.session.user._id);
//    proxy.trigger('message_saved');
//  });
//};
//
//exports.un_follow = function (req, res, next) {
//  if (!req.session || !req.session.user) {
//    res.send('forbidden!');
//    return;
//  }
//  var follow_id = req.body.follow_id;
//  get_user_by_id(follow_id, function (err, user) {
//    if (err) {
//      return next(err);
//    }
//    if (!user) {
//      res.json({status: 'failed'});
//      return;
//    }
//    Relation.remove({user_id: req.session.user._id, follow_id: user._id}, function (err) {
//      if (err) {
//        return next(err);
//      }
//      res.json({status: 'success'});
//    });
//
//    get_user_by_id(req.session.user._id, function (err, me) {
//      if (err) {
//        return next(err);
//      }
//      me.following_count -= 1;
//      me.save();
//    });
//
//    user.follower_count -= 1;
//    user.save();
//
//    req.session.user.following_count -= 1;
//  });
//};

exports.toggle_seller = function (req, res, next) {
  if (!req.session.user || !req.session.user.is_admin) {
    res.send('forbidden!</strong>');
    return;
  }
  var user_id = req.body.user_id;
  get_user_by_id(user_id, function (err, user) {
    if (err) {
      return next(err);
    }
    user.is_star = !!user.is_star;
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ status: 'success' });
    });
  });
};

//exports.get_collect_tags = function (req, res, next) {
//  if (!req.session.user) {
//    res.redirect('home');
//    return;
//  }
//  TagCollect.find({ user_id: req.session.user._id }, function (err, docs) {
//    if (err) {
//      return next(err);
//    }
//    var ids = [];
//    for (var i = 0; i < docs.length; i++) {
//      ids.push(docs[i].tag_id);
//    } 
//    tag_ctrl.get_tags_by_ids(ids, function (err, tags) {
//      if (err) {
//        return next(err);
//      }
//      res.render('user/collect_tags', { tags: tags });
//    });
//  });
//};
//
//exports.get_collect_topics = function (req, res, next) {
//  if (!req.session.user) {
//    res.redirect('home');
//    return;
//  } 
//
//  var page = Number(req.query.page) || 1;
//  var limit = config.list_topic_count;
//
//  var render = function (topics, pages) {
//    res.render('user/collect_topics', {
//      topics: topics,
//      current_page: page, 
//      pages: pages
//    });
//  };
//
//  var proxy = new EventProxy();
//  proxy.assign('topics', 'pages', render);
//
//  TopicCollect.find({ user_id: req.session.user._id }, function (err, docs) {
//    if (err) {
//      return next(err);
//    }
//    var ids = [];
//    for (var i = 0; i < docs.length; i++) {
//      ids.push(docs[i].topic_id);
//    }
//    var query = { _id: { '$in': ids } };
//    var opt = {
//      skip: (page - 1) * limit, 
//      limit: limit, 
//      sort: [ [ 'create_at', 'desc' ] ] 
//    };
//    topic_ctrl.get_topics_by_query(query, opt, function (err, topics) {
//      if (err) {
//        return next(err);
//      }
//      proxy.trigger('topics', topics);
//    });
//    topic_ctrl.get_count_by_query(query, function (err, all_topics_count) {
//      if (err) {
//        return next(err);
//      }
//      var pages = Math.ceil(all_topics_count / limit);
//      proxy.trigger('pages', pages);
//    });
//  });
//};
//
//exports.get_followings = function (req, res, next) {
//  if (!req.session.user) {
//    res.redirect('home');
//    return;
//  } 
//  Relation.find({user_id: req.session.user._id}, function (err, docs) {
//    if (err) {
//      return next(err);
//    }
//    var ids = [];
//    for (var i = 0; i < docs.length; i++) {
//      ids.push(docs[i].follow_id);
//    }
//    get_users_by_ids(ids, function (err, users) {
//      if (err) {
//        return next(err);
//      }
//      res.render('user/followings', {users: users});
//    });
//  }); 
//};
//
//exports.get_followers = function (req, res, next) {
//  if (!req.session.user) {
//    res.redirect('home');
//    return;
//  } 
//  Relation.find({follow_id: req.session.user._id}, function (err, docs) {
//    if (err) {
//      return next(err);
//    }
//    var ids = [];
//    for (var i = 0; i < docs.length; i++) {
//      ids.push(docs[i].user_id);
//    }
//    get_users_by_ids(ids, function (err, users) {
//      if (err) {
//        return next(err);
//      }
//      res.render('user/followers', {users: users});
//    });
//  }); 
//};
//
//exports.top100 = function (req, res, next) {
//  var opt = {limit: 100, sort: [['score', 'desc']]};
//  get_users_by_query({}, opt, function (err, tops) {
//    if (err) {
//      return next(err);
//    }
//    res.render('user/top100', {users: tops});
//  });
//};
//
//exports.list_topics = function (req, res, next) {
//  var user_name = req.params.name;
//  var page = Number(req.query.page) || 1;
//  var limit = config.list_topic_count;
//
//  get_user_by_name(user_name, function (err, user) {
//    if (!user) {
//      res.render('notify/notify', {error: '这个用户不存在。'});
//      return;
//    }
//    
//    var render = function (topics, relation, pages) {
//      user.friendly_create_at = Util.format_date(user.create_at, true);
//      res.render('user/topics', {
//        user: user,
//        topics: topics,
//        relation: relation,
//        current_page: page,
//        pages: pages
//      });
//    };
//
//    var proxy = new EventProxy();
//    proxy.assign('topics', 'relation', 'pages', render);
//
//    var query = {'author_id': user._id};
//    var opt = {skip: (page - 1) * limit, limit: limit, sort: [['create_at', 'desc']]};
//    topic_ctrl.get_topics_by_query(query, opt, function (err, topics) {
//      if (err) {
//        return next(err);
//      }
//      proxy.trigger('topics', topics);
//    });
//
//    if (!req.session.user) {
//      proxy.trigger('relation', null);
//    } else {
//      Relation.findOne({user_id: req.session.user._id, follow_id: user._id}, function (err, doc) {
//        if (err) {
//          return next(err);
//        }
//        proxy.trigger('relation', doc);
//      });
//    }
//
//    topic_ctrl.get_count_by_query(query, function (err, all_topics_count) {
//      if (err) {
//        return next(err);
//      }
//      var pages = Math.ceil(all_topics_count / limit);
//      proxy.trigger('pages', pages);
//    });
//  });
//};
//
//exports.list_replies = function (req, res, next) {
//  var user_name = req.params.name;
//  var page = Number(req.query.page) || 1;
//  var limit = config.list_topic_count;
//
//  get_user_by_name(user_name, function (err, user) {
//    if (!user) {
//      res.render('notify/notify', {error: '这个用户不存在。'});
//      return;
//    }
//    
//    var render = function (topics, relation, pages) {
//      user.friendly_create_at = Util.format_date(user.create_at, true);
//      res.render('user/replies', {
//        user: user,
//        topics: topics,
//        relation: relation,
//        current_page: page,
//        pages: pages
//      });
//    };
//
//    var proxy = new EventProxy();
//    proxy.assign('topics', 'relation', 'pages', render);
//
//    Reply.find({author_id: user._id}, function (err, replies) {
//      if (err) {
//        return next(err);
//      }
//      var topic_ids = [];
//      for (var i = 0; i < replies.length; i++) {
//        if (topic_ids.indexOf(replies[i].topic_id.toString()) < 0) {
//          topic_ids.push(replies[i].topic_id);
//        }
//      }
//      var query = {'_id': {'$in': topic_ids}};
//      var opt = {skip: (page - 1) * limit, limit: limit, sort: [['create_at', 'desc']]};
//      topic_ctrl.get_topics_by_query(query, opt, function (err, topics) {
//        if (err) {
//          return next(err);
//        }
//        proxy.trigger('topics', topics);
//      });
//
//      topic_ctrl.get_count_by_query(query, function (err, all_topics_count) {
//        if (err) {
//          return next(err);
//        }
//        var pages = Math.ceil(all_topics_count / limit);
//        proxy.trigger('pages', pages);
//      });
//    });
//
//    if (!req.session.user) {
//      proxy.trigger('relation', null);
//    } else {
//      Relation.findOne({user_id: req.session.user._id, follow_id: user._id}, function (err, doc) {
//        if (err) {
//          return next(err);
//        }
//        proxy.trigger('relation', doc);
//      });
//    }
//  });
//};

function get_user_by_id(id, cb) {
  User.findOne({_id: id}, cb);
}
function get_user_by_name(name, cb) {
  User.findOne({name: name}, cb);
}
function get_user_by_loginname(name, cb) {
  User.findOne({loginname: name}, cb);
}

function get_users_by_ids(ids, cb) {
  User.find({'_id': {'$in': ids}}, cb);
}
function get_users_by_query(query, opt, cb) {
  User.find(query, [], opt, cb);
}
exports.get_user_by_id = get_user_by_id;
exports.get_user_by_name = get_user_by_name;
//exports.get_user_by_loginname = get_user_by_loginname;
//exports.get_users_by_ids = get_users_by_ids;
//exports.get_users_by_query = get_users_by_query;
