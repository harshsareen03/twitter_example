const mongoose = require('mongoose')

// mongoose.set('useNewUrlParser', true)
// mongoose.set('useUnifiedTopology', true)

class Database {
  constructor() {
    this.connect()
  }
  connect() {
    mongoose
      .connect(
        'mongodb://0.0.0.0:27017'
      )
      .then(() => console.log('database connection successful'))
      .catch((err) => console.log(err))
  }
}

module.exports = new Database()
