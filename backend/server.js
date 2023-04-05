require('dotenv').config()

const express = require('express')
const orgRoutes = require('./routes/organizations')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/organizations', orgRoutes)

app.listen(process.env.PORT, () => {
  console.log('listening on the port', process.env.PORT)
})

