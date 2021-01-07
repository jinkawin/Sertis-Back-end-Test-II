var resBody = {}

function ResponseHelper(){
}

ResponseHelper.prototype.addMessage = function(message){
    resBody.message = message
}
ResponseHelper.prototype.addToken= function(token){
    resBody.token = token
}

ResponseHelper.prototype.respond = function(){
    return resBody
}

module.exports = new ResponseHelper()