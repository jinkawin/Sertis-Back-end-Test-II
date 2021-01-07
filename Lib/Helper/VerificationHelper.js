var resBody = {}

function VerificationHelper(){
    resBody = {}
}

VerificationHelper.prototype.isCredentialValid = function(requestBody){
    return (requestBody.username && requestBody.password)?true:false
}

VerificationHelper.prototype.isTokenValid = function(requestBody){
    return (requestBody.token)?true:false
}

VerificationHelper.prototype.isUsernameValid = function(requestBody){
    return (requestBody.username)?true:false
}

VerificationHelper.prototype.isUserAlreadyExisted = function(error){
    return (error.name === 'MongoError' && error.code === 11000)?true:false
}

module.exports = new VerificationHelper()