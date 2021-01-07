function ResponseHelper(response){
    this.resBody = {
        data: {},
        error: {}
    }

    this.res = response
    this.resCode = 200
}

ResponseHelper.prototype.addMessage = function(message){
    this.resBody.data.message = message
}

ResponseHelper.prototype.addBody = function(data){
    this.resBody.data = Object.assign(this.resBody.data, data)
}

ResponseHelper.prototype.addError= function(error){
    this.resBody.error = error
}

ResponseHelper.prototype.setResCode = function(code){
    this.resCode = code
}

ResponseHelper.prototype.getResCode = function(code){
    return this.resCode
}

ResponseHelper.prototype.repondBadRequest = function(){
    this.addMessage("Bad Request")

    return this.res.status(400).send(this.resBody)
}

ResponseHelper.prototype.respond = function(){
    return this.res.status(this.resCode).send(this.resBody)
}

module.exports = ResponseHelper