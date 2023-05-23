const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const OrganizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

// static signup method
OrganizerSchema.statics.signup = async function (name, email, role, password) {

  // valdation
  if (!name || !email || !role || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const organizer = await this.create({ name, email, role, password: hash })

  return organizer
}

// static login method
OrganizerSchema.statics.login = async function (email, password) {
  // valdation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const organizer = await this.findOne({ email })

  if (!organizer) {
    throw Error('Incorrect email or password')
  }

  const match = await bcrypt.compare(password, organizer.password)

  if (!match) {
    throw Error('Incorrect email or password')
  }

  return organizer

}

const Organizer = mongoose.model('Organizer', OrganizerSchema)

module.exports = Organizer;