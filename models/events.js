const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventsSchema = new Schema({
  name: { type: String },
  content: { type: String },
  startTime: { type: String },
  endTime: { type: String }
})

mongoose.model('event', EventsSchema)
