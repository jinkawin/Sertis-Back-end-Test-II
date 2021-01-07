const User = require('@app/Model/MongoDB/User')
const PASSWORD_LENGTH = 8

var generator = require('generate-password');
var verificationHelper = require('@lib/Helper/VerificationHelper')

function UserHelper(){
}

UserHelper.prototype.setUser = function(user){
    this.currentUser = user
    _setUser(user)
}

UserHelper.prototype.initAndSaveUser = function(username){
    return new Promise((resolve, reject) => {
        var userData = {
            username: username,
            password: username + "_" + this.generatePassword(PASSWORD_LENGTH),
            isLogin: false,
            token: ''
        }

        User.save(userData)
			.then(function(result){
                resolve(result)
			})
			.catch(function(error){
				if (verificationHelper.isUserAlreadyExisted(error)) {
					reject("User is already existed!")
				} else {
					reject(error)
                }
			})
    });
}

UserHelper.prototype.generatePassword = function(passwordLength){
    return generator.generate({
        length: passwordLength,
        numbers: true
    });
}

UserHelper.prototype.getCurrentUser = function(){
    return this.currentUser
}

UserHelper.prototype.verifyUserByToken = function(token){
    return new Promise((resolve, reject) => {
        User.findUserFromToken(token)
            .then(function(user){
                if(!user){
                    reject("Token expired")
                }
                resolve(user)
            })
    });
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