const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  end: {
    type: Date,
    default: ''
  },
  start: {
    type: Date,
    default: ''
  }
})

module.exports = mongoose.model('events', eventSchema)
