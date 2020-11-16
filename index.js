require('module-alias/register')
const app = require('@config/app')

/* Support Post Parameters */
// const bodyParser  = require('body-parser')
// app.express.use(bodyParser.json()) // support json encoded bodies
// app.express.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

/* Middleware to use for all requests */
// app.router.use(function(req, res, next) {
//     // console.log('Middleware is worked.')
//     next() // make sure we go to the next routes and don't stop here
// })

app.express.get('/', function(req, res) {
    res.status(404).send({ error: 'Not found' })
})

/* Init Database */
// const connection = require('@lib/Database/Connection')
// connection.connect()

/* API Call */
const apiv1 = require('./App/1.0/index'); //./routes/APIV1/index.js

/* All route must be prefixed with 'api' */
app.express.use('/api/1.0', apiv1)

/* Listening Port */
app.express.listen(app.port, function() {
    console.log('Starting Node.js on port ' + app.port)
})

// var express = require('express');
// var app = express();
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
// app.listen(3000, function () {
//   console.log('Listening to Port 8000');
// });