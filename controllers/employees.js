const db = require('../models')

function getAll(req, res) {
  res.json([ 2, 3, 5, 7, 11 ])
}

module.exports = {
  getAll
}
