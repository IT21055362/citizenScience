const { default: mongoose } = require('mongoose')
const mongoosw = require('mongoose')

const Schema = mongoose.Schema

const orgEventSchema = new Schema({
  orgName: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('OrgEvent', orgEventSchema)