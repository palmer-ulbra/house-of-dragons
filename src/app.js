require('dotenv').config()
const express = require('express')
const planRouter = require('./routes/plan')
const tokenRouter = require('./routes/token')

const app = express()

app.use(express.json())
app.use('/api', tokenRouter)
app.use('/api', planRouter)

module.exports = app
