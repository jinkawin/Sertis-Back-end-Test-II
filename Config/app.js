/* Initial Express.js */
const expressLib    = require('express')
const express       = expressLib()
const router        = expressLib.Router()
const port          = process.env.PORT || 3000

module.exports = {
    express     : express,
    router      : router,
    port        : port,
}