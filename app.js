const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const fs = require('fs')
const { join } = require('path')

const PORT = process.env.PORT || 3000
const connectionURI = require('./db/connectionURI')
const logs = require('./helpers/logs')
const models = join(__dirname, 'models')
const app = express()

fs.readdirSync(models)  
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)))

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes')
Object.keys(routes).forEach(routeName => {
  logs(`Loaded route: ${routeName}`)
	app.use(`/${routeName}`, routes[routeName])
})

app.use('*', (req, res) => {
	res.status(404).json({ message: 'Route not found', status: 404 })
})


const listen = () => {
	logs(`Database connected at ${connectionURI}`)
  app.listen(PORT, () => {
    logs(`App listen on port ${PORT}`)
  })
}
const connect = () => {
  const options = { keepAlive: 1 }
  mongoose.connect(connectionURI, options)
  return mongoose.connection
}
connect().on('error', logs).on('disconnected', connect).once('open', listen)
