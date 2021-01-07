const User = require('../Model/MongoDB/User')
var UserHelper = require('@lib/Helper/UserHelper')
var ResponseHelper = require('@lib/Helper/ResponseHelper')

module.exports = {
	async login(req, res){
		var userHelper = new UserHelper()
		var responseHelper = new ResponseHelper()

		if(!isLoginInputValid(req.body)){
			responseHelper.addMessage("Bad Request")
		}

		var user = await User.findUserFromUsername(req.body.username)
		userHelper.setUser(user)

		userHelper.login(req.body)
			.then(function(token){
				responseHelper.addMessage("success")
				responseHelper.addToken(token)

			})
			.catch(function(error){
				responseHelper.addError(error)
				responseHelper.addMessage("Cannot login")
			})
			.finally(function(){
				var responseBody = responseHelper.respond()
				return res.status(400).send(responseBody)
			})

	},
	async logout(req, res){
		var userHelper = new UserHelper()
		var responseHelper = new ResponseHelper()

		if(!isLogoutInputValid(req.body)){
			responseHelper.addMessage("Bad Request")
		}

		var user = await User.findUserFromToken(req.body.token)
		if(!user){
			responseHelper.addMessage("Cannot logout")
		}else{
			userHelper.setUser(user)
			userHelper.logout()

			responseHelper.addMessage("success")
		}
		var responseBody = responseHelper.respond()
		return res.status(400).send(responseBody)
	}
}

var isLoginInputValid = function(requestBody){
	return (requestBody.username && requestBody.password)?true:false
}

var isLogoutInputValid = function(requestBody){
	return (requestBody.token)?true:false
}