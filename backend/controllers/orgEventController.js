const OrgEvent = require('../models/orgEventModel')
const mongoose = require('mongoose')

//get all events
const getOrgEvents = async (req, res) => {
  const orgEvent = await OrgEvent.find({}).sort({ createdAt: -1 })

  res.status(200).json(orgEvent)
}

//get a single event
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

//add new event
const createOrgEvent = async (req, res) => {
  const { orgName, eventType, location, date, name, contactNo } = req.body

  try {
    const orgEvent = await OrgEvent.create({ orgName, eventType, location, date, name, contactNo })
    res.status(200).json(orgEvent)
  } catch (error) {
    res.status(400).json({ error: error.message })

  }
}

//delete a single event
const deleteOrgEvent = async (req, res) => {
  const { id } = req.params

  //check if id is valid 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  const orgEvent = await OrgEvent.findOneAndDelete({ _id: id })

  if (!orgEvent) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  res.status(200).json(orgEvent)
}

//update an event
const updateOrgEvent = async (req, res) => {
  const { id } = req.params

  //check if id is valid 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  const orgEvent = await OrgEvent.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!orgEvent) {
    return res.status(404).json({ error: 'No such event found!' })
  }

  res.status(200).json(orgEvent)
}

module.exports = {
  getOrgEvents,
  getOrgEvent,
  createOrgEvent,
  deleteOrgEvent,
  updateOrgEvent
}