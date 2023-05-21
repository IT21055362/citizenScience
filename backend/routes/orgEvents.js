const express = require('express')
const {
  createOrgEvent,
  getOrgEvent,
  getOrgEvents,
  deleteOrgEvent,
  updateOrgEvent
} = require('../controllers/orgEventController')
const Organization = require('../models/orgEventModel')

const router = express.Router()

router.get('/', getOrgEvents)

router.get('/:id', getOrgEvent)

router.post('/', createOrgEvent)

router.delete('/:id', deleteOrgEvent)

router.patch('/:id', updateOrgEvent)


module.exports = router