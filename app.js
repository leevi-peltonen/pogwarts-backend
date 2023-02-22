const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const weaponsRouter = require('./controllers/weapons')
const armorsRouter = require('./controllers/armors')
const inventoryRouter = require('./controllers/inventory')
const enemyRouter = require('./controllers/enemy')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/users', usersRouter)
app.use('/api/weapons', weaponsRouter)
app.use('/api/armor', armorsRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/enemy', enemyRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app