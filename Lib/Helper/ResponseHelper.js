var resBody = {}
var res = {}

function ResponseHelper(response){
    resBody = {
        data: {},
        error: {}
    }

    res = response
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

ResponseHelper.prototype.repondBadRequest = function(){
    this.addMessage("Bad Request")

    return res.status(400).send(resBody)
}

ResponseHelper.prototype.respond = function(){
    return resBody
}

module.exports = ResponseHelper