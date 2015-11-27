// Events model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  dateStart: Date,
  dateEnd: Date,
  description: String
});

EventSchema.virtual('dateCreated')
  .get(function(){
    return this._id.getTimestamp();
  });

var EventsSchema = new Schema({
  events: [EventSchema]
});


mongoose.model('Events', EventsSchema);