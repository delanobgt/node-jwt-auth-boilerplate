const passport = require('passport')
const db = require('../models/')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Create local strategy
const localOptions = {
  usernameField: 'email'
}
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  try {
    const foundUser = await db.User.findOne({ email })
    if (!foundUser) return done(null, false)
    // compare passwords - is `password` equal to user.password?
    if (foundUser.comparePassword(password)) {
      done(null, foundUser)
    } else {
      done(null, false)
    }
  } catch (error) {
    done(error)
  }
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}
// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the user ID in the payload exists in our database
  try {
    let foundUser = await db.User.findById(payload.sub)
    if (foundUser) {
      done(null, foundUser)
    } else {
      done(null, false)
    }
  } catch (error) {
    done(error, false)
  }
})

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
