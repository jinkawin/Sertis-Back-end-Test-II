var resBody = {}

function ResponseHelper(){
    resBody = {}
}

ResponseHelper.prototype.addMessage = function(message){
    resBody.message = message
}

ResponseHelper.prototype.addToken= function(token){
    resBody.token = token
}

ResponseHelper.prototype.addError= function(error){
    resBody.error = error
}

ResponseHelper.prototype.respond = function(){
    return resBody
}

module.exports = ResponseHelper