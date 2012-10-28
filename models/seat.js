var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
  
var SeatSchema = new Schema({
  // seat identify
  name: { type: String, unique: true, index: true },
  // owner is seller
  owner_id: { type: ObjectId },
  // next serving number
  current_num: { type: Number, default: 0 },
  // queue number
  current_cnt: { type: Number, default: 0 },
  // remain waiting number
  waiting_num: { type: Number, default: 0 },
  // total serving count one day
  server_cnt: { type: Number, default: 0 },
  // reading count
  pageview_cnt: { type: Number, default: 0 },
  // reading user count
  userview_cnt: { type: Number, default: 0 },
  // create time
  create_tm: { type: Date, default: Date.now },
});

mongoose.model('Seat', SeatSchema);
