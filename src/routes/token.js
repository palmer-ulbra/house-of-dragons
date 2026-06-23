const express = require('express')
const jwt = require('jsonwebtoken')
const alunos = require('../../alunos.json')

const router = express.Router()

router.post('/token', (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const aluno = alunos.find(a => a.email.toLowerCase() === email.toLowerCase())

  if (!aluno) {
    return res.status(401).json({ error: 'Email not authorized' })
  }

  const token = jwt.sign(
    { sub: `${aluno.nome}(${aluno.email})` },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return res.json({ token })
})

module.exports = router
