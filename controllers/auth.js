const jwt = require('jwt-simple')
const db = require('../models')
const config = require('../config')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret)
}

function signin (req, res) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.json({ token: tokenForUser(req.user) })
}

async function signup (req, res) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).json({ error: 'You must provide email and password' })
  }

  // See if a user with the given email exists
  try {
    // If a user with email does exist, return an error
    const foundUser = await db.User.findOne({ email })
    if (foundUser) return res.status(422).send({ error: 'Email is in use' })

    // If a user with email does NOT exist, create and save user record
    const newUser = db.User.create({ email, password })
    res.json({ token: tokenForUser(newUser) })
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = {
  signin,
  signup
}
