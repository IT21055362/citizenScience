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

  const organization = await OrgEvent.findById(id)

  if (!organization) {
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

const deleteOrgEvent = async (req, res) => {
  const { id } = req.params

  //check if id is valid 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  const organization = await OrgEvent.findOneAndDelete({ _id: id })

  if (!organization) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  res.status(200).json(organization)
}

const updateOrgEvent = async (req, res) => {
  const { id } = req.params

  //check if id is valid 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  const organization = await OrgEvent.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!organization) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  res.status(200).json(organization)
}

module.exports = {
  getOrgEvents,
  getOrgEvent,
  createOrgEvent,
  deleteOrgEvent,
  updateOrgEvent
}