/**
*   @read Mongoose https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*/

const mongoose      = require('mongoose'),
      connectFormat = 'mongodb://',
      Log           = require('@lib/Log/lib/Log').default

function MongoDB(){
}

MongoDB.prototype.connect = function(connection){
    var connectionStr   = '',
        uri             = '',
        db              = null,
        options = {
        useNewUrlParser: true
    }

    if(connection.username != ''){
        connectionStr = connection.username + ':'
            + connection.password + '@'
            + connection.host + ':'
            + connection.port

    }else{
        connectionStr = connection.host
    }

    /* Connect Mongo DB */
    uri = connectFormat + connectionStr + '/' + connection.database
    mongoose.connect(uri, options).then(
        () => {
            Log.write(`${connection.name} Connection has been established successfully`)
            console.log(`${connection.name} Connection has been established successfully`)
        },
        err => {
            let _errmsg = err.errmsg || err.name

            Log.write(`${connection.name} is unable to connect to the database: ${_errmsg}`)
            console.error(`${connection.name} is unable to connect to the database:`, err)
        }
    )

    db = mongoose.connection

    return mongoose
}

/* If there is problem about special character in password or username, use connection code below instead of connection string */
MongoDB.prototype.connectAdv = function(connection){
    db = mongoose.connect(`mongodb://${connection.host}:${connection.port}/${connection.database}`, {
        auth: {
            user: connection.username,
            password: connection.password
        },
        useNewUrlParser: true
    }).then(
        () => {
            Log.write(`${connection.name} Connection has been established successfully`)
            console.log(`${connection.name} Connection has been established successfully`)
        },
        err => {
            let _errmsg = err.errmsg || err.name

            Log.write(`${connection.name} is unable to connect to the database: ${_errmsg}`)
            console.error(`${connection.name} is unable to connect to the database:`, err)
        }
    )

    db = mongoose.connection

    Log.write('MongoDB is connected')

    return mongoose
}

module.exports = new MongoDB()