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
			await userHelper.initAndSaveUser(req.body.username)
			responseHelper.addMessage("success")

		}catch (error){
			responseHelper.addError(error)
		}finally{
			var responseBody = responseHelper.respond()
			return res.status(400).send(responseBody)
		}

	}
}