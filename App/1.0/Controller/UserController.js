const User = require('../Model/MongoDB/User')

var ResponseHelper = require('@lib/Helper/ResponseHelper')
var verificationHelper = require('@lib/Helper/VerificationHelper')
var UserHelper = require('@lib/Helper/UserHelper')

module.exports = {
	async signUp(req, res){


		var responseHelper = new ResponseHelper(res)
		var userHelper = new UserHelper()

		if(!verificationHelper.isUsernameValid(req.body)){
			return responseHelper.repondBadRequest()
		}

		try{
			var user = await userHelper.initAndSaveUser(req.body.username)
			responseHelper.addMessage("success")

			console.log("yes")

		}catch (error){
			responseHelper.addError(error)
		}finally{
			var responseBody = responseHelper.respond()
			return res.status(400).send(responseBody)
		}

	}
}