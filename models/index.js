const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL || 'mongodb://localhost/jwt-auth'
mongoose.connect(DB_URL)

exports.User = require('./user')
