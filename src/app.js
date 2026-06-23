require('dotenv').config()
const express = require('express')
const planRouter = require('./routes/plan')
const tokenRouter = require('./routes/token')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use(express.json())
app.use('/api', tokenRouter)
app.use('/api', planRouter)

module.exports = app
