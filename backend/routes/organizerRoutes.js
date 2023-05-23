const express = require('express')
const {
  createUser,
  deleteUser,
  updateUser,
  loginUser,

} = require('../controllers/organizerController')

const router = express.Router()


// POST a new user
router.post('/signup', createUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

// login route
router.post('/login', loginUser)

module.exports = router