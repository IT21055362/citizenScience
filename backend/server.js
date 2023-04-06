require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const orgRoutes = require('./routes/organizations')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/organizations', orgRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on the port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })



