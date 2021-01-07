const User = require('@app/Model/MongoDB/User')

function UserHelper(){
}

UserHelper.prototype.setUser = function(user){
    this.currentUser = user
    _setUser(user)
}

UserHelper.prototype.getCurrentUser = function(){
    return this.currentUser
}

UserHelper.prototype.login = async function(requestBody){
    var isCorrect = await isPasswordCorrect(requestBody.password)
    if(isCorrect){
        return getAndUpdateUserToken()
    }
}

UserHelper.prototype.logout = function(){

    this.currentUser.token = ""
    this.currentUser.isLogin = false

    // update token and status
    this.currentUser.save()
}

function _setUser(user){
    this.currentUser = user
}

function isPasswordCorrect(password){
    return new Promise((resolve, reject) => {
        this.currentUser.comparePassword(password, function(err, isMatch) {
            resolve(isMatch)
        })
    });
}

function getAndUpdateUserToken(){
    var user = this.currentUser
    return new Promise((resolve, reject) => {

        // Generate token
        require('crypto').randomBytes(48, function(err, buffer) {

            // create or get the old one
            user.token = (user.isLogin)?user.token:buffer.toString('hex')

            updateTokenAndStatus(user.token)
            resolve(user.token)
        });
    });
}

function updateTokenAndStatus(token){
    this.currentUser.token = token
    this.currentUser.isLogin = true
    this.currentUser.save()
}


module.exports = UserHelper