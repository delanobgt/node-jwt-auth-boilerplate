const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

// Define our model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
})

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function (next) {
  try {
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(this.password, salt)
    this.password = passwordHash
    next()
  } catch (err) {
    next(err)
  }
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema)

// Export the model
module.exports = ModelClass
