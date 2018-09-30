// Main starting point of the application
require('dotenv').config()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const app = require('express')()
const cors = require('cors')
const { requireAuth } = require('./middlewares/auth')

// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(methodOverride('_method'))

// Routes Setup
app.use('/auth', require('./routes/auth'))
app.use('/employees', require('./routes/employees'))

// Misc routes
app.get('/', (req, res) => {
  res.send('index')
})
app.get('*', (req, res) => {
  res.redirect('/')
})

// Server Setup
const PORT = process.env.PORT || 3090
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
})
