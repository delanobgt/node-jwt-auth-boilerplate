const Employee = require('../controllers/employees')
const { requireAuth } = require('../middlewares/auth')
const router = require('express').Router()

router.get('/', requireAuth, Employee.getAll)

module.exports = router
