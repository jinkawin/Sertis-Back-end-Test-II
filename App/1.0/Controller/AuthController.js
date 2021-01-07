const User = require('@app/Model/MongoDB/User')
var UserHelper = require('@lib/Helper/UserHelper')
var ResponseHelper = require('@lib/Helper/ResponseHelper')
var verificationHelper = require('@lib/Helper/VerificationHelper')

module.exports = {
	async login(req, res){
		var userHelper = new UserHelper()
		var responseHelper = new ResponseHelper(res)

		if(!verificationHelper.isCredentialValid(req.body)){
			return responseHelper.repondBadRequest()
		}

		var user = await User.findUserFromUsername(req.body.username)
		userHelper.setUser(user)

		userHelper.login(req.body)
			.then(function(token){
				responseHelper.addMessage("success")
				responseHelper.addBody({token})

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

		if(!verificationHelper.isTokenValid(req.body)){
			return responseHelper.repondBadRequest()
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