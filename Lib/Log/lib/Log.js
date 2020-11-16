const   FOLDER_PATH = process.env.PWD + '/Log'
var     fs = require('fs')
var     moment = require('moment')

function LogFile(){

}

LogFile.prototype.write = function(msg){

    return new Promise((resolve, reject) => {
        var now = new Date(),
            date = moment().format('DD_MM_YYYY')

        fs.appendFile(`${FOLDER_PATH}/process_${date}.log`, `${now}: ${msg}` + "\r\n", function(err) {
            if(err) {
                reject(err)
                console.log(err)
            }
            resolve(true)
        })
    })
}

module.exports.default = new LogFile()