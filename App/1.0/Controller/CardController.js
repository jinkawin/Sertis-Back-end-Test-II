var CardHelper = require('@lib/Helper/CardHelper')
var ResponseHelper = require('@lib/Helper/ResponseHelper')
var verificationHelper = require('@lib/Helper/VerificationHelper')
var UserHelper = require('@lib/Helper/UserHelper')


module.exports = {

	async addNewCard(req, res){

		var cardHelper = new CardHelper()
		var responseHelper = new ResponseHelper(res)
		var userHelper = new UserHelper()

		if(!verificationHelper.isTokenValid(req.body)){
			return responseHelper.repondBadRequest()
		}

		try{
			var user = await userHelper.verifyUserByToken(req.body.token)
			cardHelper.saveNewCard(user, req.body)
			responseHelper.addMessage("success")

		}catch (error){
			responseHelper.addError(error)
			responseHelper.setResCode(400)
		}finally{
			return responseHelper.respond()
		}

	},
	async editCard(req, res){
		var cardHelper = new CardHelper()
		var responseHelper = new ResponseHelper(res)
		var userHelper = new UserHelper()

		if(!verificationHelper.isTokenValid(req.body)){
			return responseHelper.repondBadRequest()
		}

		try{
			var user = await userHelper.verifyUserByToken(req.body.token)
			var card = await cardHelper.updateCard(user, req.body)
			responseHelper.addMessage("success")
			responseHelper.addBody(card)

		}catch (error){
			responseHelper.addError(error)
			responseHelper.setResCode(400)
		}finally{
			return responseHelper.respond()
		}
	},
	async deleteCard(req, res){

		var cardHelper = new CardHelper()
		var responseHelper = new ResponseHelper(res)
		var userHelper = new UserHelper()

		if(!verificationHelper.isTokenValid(req.body)){
			return responseHelper.repondBadRequest()
		}

		try{
			var user = await userHelper.verifyUserByToken(req.body.token)
			await cardHelper.deleteCard(user, req.body)
			responseHelper.addMessage("success")

		}catch (error){
			responseHelper.addError(error)
			responseHelper.setResCode(400)
		}finally{
			return responseHelper.respond()
		}
	}
}