var md5 = require('md5')

function Security(){

}

Security.prototype.check = function(data){
    return md5(JSON.stringify(req.body))
}

module.exports.default = new Security()