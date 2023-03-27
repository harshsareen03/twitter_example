const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {})
router.post('/', async (req, res, next) => {
  res.status(200).send('it worked')
})

module.exports = router
