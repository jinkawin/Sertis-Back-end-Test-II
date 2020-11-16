const User = require('../Model/MongoDB/User')

var generator = require('generate-password')
var security = require('@lib/Security/Security')

module.exports = {
	login(req, res){

		if(!req.body.username || !req.body.password) return res.status(400).send({
			message: "Bad Request"
		})

		User.findUserFromUsername(req.body.username)
			.then(function(user){

				// If there is no such a user in database
				if(!user) return res.status(400).send({
					message: "Incorrect username or password"
				})

				// test a matching password
				user.comparePassword(req.body.password, function(err, isMatch) {
					if (err) res.status(400).send(err);

					var msg;
					if(isMatch){
						// Generate token
						require('crypto').randomBytes(48, function(err, buffer) {
							var token;

							// create or get the old one
							user.token = (user.isLogin)?user.token:buffer.toString('hex')
							user.isLogin = true

							// update token and status
							user.save()

							return res.status(400).send({
								message: "success",
								token: user.token
							})
						});

					}else{
						return res.status(400).send({
							message: "Incorrect username or password"
						})
					}
				});
			})
			.catch(function(error){
				return res.status(400).send(error)
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