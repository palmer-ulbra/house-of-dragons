const express = require('express')
const { createClient } = require('@supabase/supabase-js')
const auth = require('../middlewares/auth')

const router = express.Router()

const VALID_PLANS = ['BASIC', 'STANDARD', 'PLATINUM']
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

router.post('/plan', auth, async (req, res) => {
  const { email, plan } = req.body

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  if (!plan || !VALID_PLANS.includes(plan)) {
    return res.status(400).json({ error: 'Plan must be BASIC, STANDARD or PLATINUM' })
  }

  const { data, error } = await supabase
    .from('hbo')
    .insert({ email, plan, user: req.user })
    .select('id')
    .single()

  if (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to save plan' })
  }

  return res.status(201).json({ message: 'Plan registered successfully', id: data.id })
})

module.exports = router
