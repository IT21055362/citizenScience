const express = require('express')
const router = express.Router()

//get all organizations
router.get('/', (req, res) => {
  res.json({ mssg: 'GET all organizations' })
})

//GET a single organization
router.get('/:id', (req, res) => {
  res.json({ mssg: 'GET a single organization' })
})


router.post('/', (req, res) => {
  res.json({ mssg: 'POST a new organization' })
})

router.delete('/:id', (req, res) => {
  res.json({ mssg: 'DELETE a organization' })
})

router.patch('/:id', (req, res) => {
  res.json({ mssg: 'UPDATE a new organization' })
})


module.exports = router