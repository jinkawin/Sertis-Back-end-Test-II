/**
*   @read Mongoose https://github.com/vitaly-t/pg-promise
*/

const pgp             = require('pg-promise')(),
      connectFormat = 'postgres://',
      Log = require('@lib/Log/lib/Log').default

function PostgreSQL(){

}

PostgreSQL.prototype.connect = function(connection){
    var connectionStr   = ''
    var uri             = ''
    var connection      = null

    if(this.connection.username != ''){
        connectionStr = this.connection.username + ':'
            + this.connection.password + '@'
            + this.connection.host + ':'
            + this.connection.port
    }else{
        connectionStr = this.connection.host
    }
    uri = connectFormat + connectionStr + '/' + this.connection.database
    connection = pgp(uri)

    return connection
}

PostgreSQL.prototype.connectAdv = function(connection){
    var connectionStr   = ''
    var uri             = ''
    var connection      = null

    if(this.connection.username != ''){
        connectionStr = this.connection.username + ':'
            + this.connection.password + '@'
            + this.connection.host + ':'
            + this.connection.port
    }else{
        connectionStr = this.connection.host
    }
    uri = connectFormat + connectionStr + '/' + this.connection.database
    connection = pgp(uri)

    return connection
}

module.exports = new PostgreSQL()