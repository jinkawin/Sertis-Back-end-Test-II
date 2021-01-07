const User = require('../Model/MongoDB/User')

var generator = require('generate-password')

var security = require('@lib/Security/Security')

var userHelper = require('@lib/Helper/UserHelper')
var responseHelper = require('@lib/Helper/ResponseHelper')

var isLoginInputValid = function(requestBody){
	return (requestBody.username && requestBody.password)?true:false
}

module.exports = {
	async login(req, res){
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
				console.log(error)

				responseHelper.addMessage("Cannot login")
			})
			.finally(function(){
				var responseBody = responseHelper.respond()
				return res.status(400).send(responseBody)
			})

	},
	logout(req, res){

		if(!req.body.token) return res.status(400).send({
			message: "Bad Request"
		})

		User.findUserFromToken(req.body.token)
			.then(function(user){

				// If there is no such a user in database
				if(!user) return res.status(400).send({
					message: "Cannot logout from the system"
				})

				user.token = ""
				user.isLogin = false

				// update token and status
				user.save()

				return res.status(200).send({
					message: "success",
					token: user.token
				})
			})
			.catch(function(error){
				return res.status(400).send(error)
			})
	}
}