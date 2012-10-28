var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config');
  
var UserSchema = new Schema({
  name: { type: String, index: true },
  loginname: { type: String, unique: true },
  pass: { type: String },
  email: { type: String, unique: true },
  location: { type: String },
  signature: { type: String },
  profile: { type: String },
  weibo: { type: String },
  profile_image_url: { type: String },
  avatar: { type: String },
  
  score: { type: Number, default: 0 },
  level: { type: String },
  active: { type: Boolean, default: true },
  
  receive_reply_mail: {type: Boolean, default: false },
  receive_at_mail: { type: Boolean, default: false },

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  // if is seller or customer
  is_seller: { type: Boolean, default: false},
  seller_seats_num: { type: Number, default: 0 },

  // for active user
  retrieve_time : {type: Number},
  retrieve_key : {type: String}

});

UserSchema.virtual('avatar_url').get(function () {
  var avatar_url = this.profile_image_url || this.avatar;
  if (!avatar_url) {
    avatar_url = config.site_static_host + '/images/user_icon&48.png';
  }
  return avatar_url;
});

mongoose.model('User', UserSchema);
