// For Customer Seats Info
// display:
//   total_seats_num
//   current_seats_num
//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
  
var OneSeatSchema = new Schema({
  // seat identify
  name: { type: String, unique: true },
  // owner is customer
  owner: { type: ObjectId, index: true },
  // parent is seat cluster
  parents: { type: ObjectId, index: true },
  // create time
  create_tm: { type: Date, default: Date.now }, 

  order: { type: Number, default: 0 },
  // queue 
  queue_length: { type: Number, default: 0 },
});

mongoose.model('OneSeat', OneSeatSchema);
