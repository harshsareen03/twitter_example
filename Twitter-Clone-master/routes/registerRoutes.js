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
  res.status(200).render('register')
})

router.post('/', async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body
  const payload = req.body

  if (firstname && lastname && username && email && password) {
    try {
      const user = await User.findOne({
        $or: [{ username: username }, { email: email }],
      })
      console.log(user)
      if (user == null) {
        const data = req.body
        const newUser = await User.create({
          ...data,
          password: await bcrypt.hash(password, 6),
        })
        req.session.user = newUser
        console.log(req.session.user)
        res.redirect('/')
      } else {
        payload.errorMessage =
          email == user?.email
            ? 'Email already in user'
            : 'Username already in user'
      }
    } catch (error) {
      console.log(error)
      payload.errorMessage = 'Something went wrong'
      res.status(200).render('register', payload)
    }
  } else {
    payload.errorMessage = 'Make sure each field has a valid value'
    res.status(200).render('register', payload)
  }
})

module.exports = router
