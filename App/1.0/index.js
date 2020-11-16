const express = require('express')
const router = express.Router()

require('./Route/TestRoute')(router)
require('./Route/AuthRoute')(router)
require('./Route/UserRoute')(router)

module.exports = router