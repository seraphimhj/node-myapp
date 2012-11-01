var mongoose = require('mongoose');
var config = require('../config');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
  
var SellerSchema = new Schema({
  name: { type: String, index: true },
  loginname: { type: String, unique: true },
  pass: { type: String },
  email: { type: String, unique: true },
  location: { type: String, unique: true },
  signature: { type: String },
  profile: { type: String },
  weibo: { type: String },
  profile_image_url: { type: String },
  
  receive_reply_mail: {type: Boolean, default: false },
  receive_at_mail: { type: Boolean, default: false },

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  // for active user
  retrieve_time : {type: Number},
  retrieve_key : {type: String}
   
  score: { type: Number, default: 0 },
  level: { type: String },
  active: { type: Boolean, default: true },
   
  // business data
  total_seats_num: { type: Number, default: 0 },
  // SeatCluster
  current_seat: { type: ObjectId },
              
});

mongoose.model('Seller', SellerSchema);
