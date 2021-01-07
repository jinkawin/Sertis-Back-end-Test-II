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

VerificationHelper.prototype.isUserAbleToEditCard = function(user, card){
    if(!card){
        return false
    }
    if(user.username != card.author){
        return false
    }

    return true
}

module.exports = new VerificationHelper()