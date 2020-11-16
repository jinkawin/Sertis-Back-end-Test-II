/**
*   @read Sequelize http://docs.sequelizejs.com/
*/

const Sequelize = require('sequelize'),
      connectFormat = 'mysql://',
      Log = require('@lib/Log/lib/Log').default

function MySQL(){
}

MySQL.prototype.connect = function(connection){
    var connectionStr   = '',
        uri             = '',
        sequelize       = null

    if(connection.username != ''){
        connectionStr = connection.username + ':'
            + connection.password + '@'
            + connection.host
    }else{
        connectionStr = connection.host
    }
    uri = connectFormat + connectionStr + '/' + connection.database

    sequelize = new Sequelize(uri, {
        logging: false
    })

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
            Log.write('Connection has been established successfully.')
        })
        .catch(err => {
            console.log('Unable to connect to the database:', err)
            Log.write(`Unable to connect to the database: ${err}`)
        });

    return sequelize
}

MySQL.prototype.connectAdv = function(connection){
    const sequelize = new Sequelize(connection.database, connection.username, connection.password, {
        host: connection.host,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: false,

        pool: {
            max: 5, //Maximum connection pool (Number of connection)
            min: 0,
            acquire: 100*1000, //Timeout (100 seconds)
            idle: 10000 //Maximum idle time before disconnected
        },
      });

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
            Log.write('Connection has been established successfully.')
        })
        .catch(err => {
            console.log('Unable to connect to the database:', err)
            Log.write(`Unable to connect to the database: ${err}`)
        });

    return sequelize
}
module.exports = new MySQL()