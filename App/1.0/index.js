const express = require('express')
const router = express.Router()

// require('./Route/ServiceRoute')(router)
require('./Route/TestRoute')(router)

module.exports = router