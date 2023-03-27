const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const User = require('../models/UserSchema')
const app = express()
const router = express.Router()

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))

router.get('/', (req, res, next) => {
  res.status(200).render('login')
})

router.post('/', async (req, res, next) => {
  const { logUsername, logPassword } = req.body
  const payload = req.body
  console.log(logUsername, logPassword)
  if (logUsername && logPassword) {
    try {
      const user = await User.findOne({
        $or: [{ username: logUsername }, { email: logUsername }],
      })
      if (user != null) {
        const result = await bcrypt.compare(logPassword, user.password)
        if (result) {
          req.session.user = user
          return res.redirect('/')
        }
      }
      payload.errorMessage = 'Login credentials incorrect'
      res.status(200).render('login', payload)
    } catch (error) {
      console.log(error)
      payload.errorMessage = 'Something went wrong'
      res.status(200).render('login', payload)
    }
  } else {
    payload.errorMessage = 'Make sure each field has a valid value'
    res.status(200).render('login', payload)
  }
})

module.exports = router
