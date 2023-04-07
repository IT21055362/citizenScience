const express = require('express')
const {
  createOrgEvent,
  getOrgEvent,
  getOrgEvents
} = require('../controllers/orgEventController')
const Organization = require('../models/orgEventModel')

const router = express.Router()

router.get('/', getOrgEvents)

router.get('/:id', getOrgEvent)

router.post('/', createOrgEvent)

router.delete('/:id', (req, res) => {
  res.json({ mssg: 'DELETE a organization' })
})

router.patch('/:id', (req, res) => {
  res.json({ mssg: 'UPDATE a new organization' })
})


module.exports = router