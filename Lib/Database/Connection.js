const   config = require('@config/database')

const   MongoDB = require('@lib/Database/MongoDB'),
        PostgreSQL = require('@lib/Database/PostgreSQL'),
        MySQL = require('@lib/Database/MySQL')

var     dbs = [],
        isConnected = false

function Connection(){
    this.config = config
    this.driver = {
        MongoDB: MongoDB,
        PostgreSQL: PostgreSQL,
        MySQL: MySQL,
    }
}

Connection.prototype.connect = function(){
    for(const name in this.config) {
        let setting = this.config[name],
            _driver = this.driver[setting.driver],
            _connection = null

            setting.name = name

        if(setting.advance){
            _connection = _driver.connectAdv(setting)
        }else{
            _connection = _driver.connect(setting)
        }

        dbs[name] = _connection
    }

    isConnected = true
}

Connection.prototype.get = function(_db){
    if(!isConnected)
        this.connect()

    return dbs[_db]
}

module.exports = new Connection()