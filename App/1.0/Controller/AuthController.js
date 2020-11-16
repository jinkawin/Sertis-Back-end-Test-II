const User = require('../Model/MongoDB/User')

var generator = require('generate-password');

module.exports = {
	login(req, res){

		// TODO: validate feild wheter there is username or password or not.

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

							res.status(400).send({
								message: "success",
								token: user.token
							})
						});

					}else{
						msg = {
							message: "Incorrect username or password"
						}
					}
				});
			})
			.catch(function(error){
				res.status(400).send(error)
			})
	},
	logout(req, res){
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

				res.status(400).send({
					message: "success",
					token: user.token
				})

				res.status(200).send("logout")
			})
			.catch(function(error){
				res.status(400).send(error)
			})
	}
}