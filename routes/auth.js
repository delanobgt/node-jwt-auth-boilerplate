const Authentication = require('../controllers/auth')
const { requireSignin } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/signin', requireSignin, Authentication.signin)
router.post('/signup', Authentication.signup)

module.exports = router
