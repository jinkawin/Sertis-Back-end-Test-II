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

module.exports = new VerificationHelper()