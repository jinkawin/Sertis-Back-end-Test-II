const User = require('@app/Model/MongoDB/User'),
	  Card = require('@app/Model/MongoDB/Card')


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
		}finally{
			var responseBody = responseHelper.respond()
			return res.status(400).send(responseBody)
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
			var card = await cardHelper.updateCardByCardId(user, req.body)
			responseHelper.addMessage("success")
			responseHelper.addBody(card)

		}catch (error){
			responseHelper.addError(error)
		}finally{
			var responseBody = responseHelper.respond()
			return res.status(400).send(responseBody)
		}
	},
	deleteCard(req, res){
		if(!req.body.token) return res.status(400).send({
			message: "Bad request"
		})

		User.findUserFromToken(req.body.token)
			.then(function(user){

				// If there is no such a user in database
				if(!user) return res.status(400).send({
					message: "Token expired"
				})

				Card.deleteCardById(req.body.card_id)
					.then(function(result){
						return res.status(200).send({
							message: "success"
						})
					})
					.catch(function(error){
						return res.status(200).send({
							message: "Something went wrong"
						})
					})
			})
			.catch(function(error){
				return res.status(400).send(error)
			})
	}
}