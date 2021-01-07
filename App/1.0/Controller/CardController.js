const User = require('@app/Model/MongoDB/User'),
	  Card = require('@app/Model/MongoDB/Card')


var CardHelper = require('@lib/Helper/CardHelper')
var ResponseHelper = require('@lib/Helper/ResponseHelper')
var verificationHelper = require('@lib/Helper/VerificationHelper')
var UserHelper = require('@lib/Helper/UserHelper')


module.exports = {

	async addNewCard(req, res){

		var cardHelper = new CardHelper()
		var responseHelper = new ResponseHelper()
		var userHelper = new UserHelper()

		if(!verificationHelper.isTokenValid(req.body)){
			responseHelper.addMessage("Bad Request")

			var responseBody = responseHelper.respond()
			return res.status(400).send(responseBody)
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
	editCard(req, res){
		if(!req.body.token) return res.status(400).send({
			message: "Bad request"
		})

		User.findUserFromToken(req.body.token)
			.then(function(user){

				// If there is no such a user in database
				if(!user) return res.status(400).send({
					message: "Token expired"
				})

				// Save the card
				Card.findCardById(req.body.card_id)
					.then(function(card){

						// If there is no such a card
						if(!card) return res.status(400).send({
							message: "Something went wrong"
						})

						// update field and save
						card.name = req.body.name
						card.status = req.body.status
						card.content = req.body.content
						card.category = req.body.category
						card.save()

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