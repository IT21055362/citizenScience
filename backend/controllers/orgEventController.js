const OrgEvent = require('../models/orgEventModel')
const mongoose = require('mongoose')

const getOrgEvents = async (req, res) => {
  const organization = await OrgEvent.find({}).sort({ createdAt: -1 })

  res.status(200).json(organization)
}

const getOrgEvent = async (req, res) => {
  const { id } = req.params

  //check if id is valid 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  const orgEvent = await OrgEvent.findById(id)

  if (!orgEvent) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  res.status(200).json(orgEvent)
}

const createOrgEvent = async (req, res) => {
  const { orgName, eventType, location, date, name, contactNo } = req.body

  try {
    const organization = await OrgEvent.create({ orgName, eventType, location, date, name, contactNo })
    res.status(200).json(organization)
  } catch (error) {
    res.status(400).json({ error: error.message })

  }
}

module.exports = {
  getOrgEvents,
  getOrgEvent,
  createOrgEvent
}