const User = require('../Model/MongoDB/User'),
	  Card = require('../Model/MongoDB/Card')


module.exports = {
	// TODO: check session id to prevent cookie hijacking
	// TODO: add check sum to prevent modification/ man in the middle

	addNewCard(req, res){
		if(!req.body.token) return res.status(400).send({
			message: "Bad request"
		})

		User.findUserFromToken(req.body.token)
			.then(function(user){

				// If there is no such a user in database
				if(!user) return res.status(400).send({
					message: "Token expired"
				})

				// add author name by using token
				var data = req.body
				data.author = user.username

				// Save the card
				Card.save(data)
					.then(function(result){
						return res.status(200).send({
							message: "success"
						})
					})
					.catch(function(error){
						return res.status(200).send(error)
					})

			})
			.catch(function(error){
				return res.status(400).send(error)
			})
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