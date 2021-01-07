var resBody = {}

function ResponseHelper(){
    resBody = {
        data: {},
        error: {}
    }
}

ResponseHelper.prototype.addMessage = function(message){
    resBody.data.message = message
}

ResponseHelper.prototype.addBody = function(data){
    resBody.data = Object.assign(resBody.data, data)
}

ResponseHelper.prototype.addError= function(error){
    resBody.error = error
}

ResponseHelper.prototype.respond = function(){
    return resBody
}

module.exports = ResponseHelper