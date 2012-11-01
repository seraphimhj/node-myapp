// For Seller Seats Info
// display:
//   total_seats_num
//   current_seats_num
//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
  
var SeatClusterSchema = new Schema({
  // seat identify
  name: { type: String, unique: true },
  // owner is seller
  owner: { type: ObjectId, index: true },
  // create time
  create_tm: { type: Date, default: Date.now }, 

  // next serving number
  next_id: { type: Number, default: 0 },
  // queue 
  queue_length: { type: Number, default: 0 },

  // For Statistic
  // total cnt
  serving_cnt: {type: Number, default: 0 },
  // or from log
  // reading count
  pageview_cnt: { type: Number, default: 0 },
  // reading user count
  userview_cnt: { type: Number, default: 0 },
 
});

mongoose.model('SeatCluster', SeatClusterSchema);
