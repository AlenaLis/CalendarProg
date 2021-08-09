const express = require('express')
const bodyParser  = require('body-parser')
const  authRoutes = require('./routes/auth')
const  eventRoutes = require('./routes/event')
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI)
    .then(() => console.log('mongoDB connect'))
    .catch(error => console.log('ewfewfwefewf',error))
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/event', eventRoutes)

module.exports = app
