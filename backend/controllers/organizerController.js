const Organizer = require('../models/organizerModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
var sendEmail = require('../utils/sendEmail')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}

// create new user
const createUser = async (req, res) => {
  const { name, email, role, password } = req.body

  if (!name || !email || !role || !password) {
    return res.status(400).json({ error: 'All fields must be filled' })
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email is not valid' })
  }
  if (await Organizer.findOne({ email })) {
    return res.status(400).json({ error: 'Email already in use' })
  }
}
if (!validator.isStrongPassword(password)) {
  return res.status(400).json({ error: 'Password not strong enough. Must contains uppercase, lowercase, numbers and more than eight characters' })
}

// add doc to db
try {
  const organizer = await Organizer.create({ name, email, role, password })
  sendEmail(email, 'Citizen Science Account Created', `Your account has been created successfully. Email: ${email} Password: ${password}`)
  res.status(200).json(organizer)
} catch (error) {
  res.status(400).json({ error: error.message })
}

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User does not exsist' })
  }

  const organizer = await Organizer.findOneAndDelete({ _id: id })

  if (!organizer) {
    return res.status(404).json({ error: 'User does not exsist' })
  }

  res.status(200).json(organizer)

}

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email, role } = req.body


  if (!name || !email || !role) {
    return res.status(400).json({ error: 'All fields must be filled' })
  }
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: 'Email is not valid' })
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User does not exsist' })
  }

  const organizer = await Organizer.findOneAndUpdate({ _id: id }, {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,

  })

  if (!organizer) {
    return res.status(404).json({ error: 'User does not exsist' })
  }

  res.status(200).json(organizer)
}

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const organizer = await organizer.login(email, password)

    // create a token
    const token = createToken(organizer._id)
    const id = organizer._id

    res.status(200).json({ id, email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
module.exports = {
  createUser,
  deleteUser,
  updateUser,
  loginUser,

}