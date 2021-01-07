var resBody = {}
var res = {}

function ResponseHelper(response){
    resBody = {
        data: {},
        error: {}
    }

    res = response
    this.resCode = 200
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

ResponseHelper.prototype.setResCode = function(code){
    this.resCode = code
}

ResponseHelper.prototype.getResCode = function(code){
    return this.resCode
}

ResponseHelper.prototype.repondBadRequest = function(){
    this.addMessage("Bad Request")

    return res.status(400).send(resBody)
}

ResponseHelper.prototype.respond = function(){
    return res.status(this.resCode).send(resBody)
}

module.exports = ResponseHelper