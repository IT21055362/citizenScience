const express = require('express')
const Organization = require('../models/orgModel')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ mssg: 'GET all organizations' })
})

router.get('/:id', (req, res) => {
  res.json({ mssg: 'GET a single organization' })
})

router.post('/', async (req, res) => {
  const { orgName, eventType, location, date, name, contactNo } = req.body

  try {
    const organization = await Organization.create({ orgName, eventType, location, date, name, contactNo })
    res.status(200).json(organization)
  } catch (error) {
    res.status(400).json({ error: error.message })

  }
  // res.json({ mssg: 'POST a new organization' })
})

router.delete('/:id', (req, res) => {
  res.json({ mssg: 'DELETE a organization' })
})

router.patch('/:id', (req, res) => {
  res.json({ mssg: 'UPDATE a new organization' })
})


module.exports = router