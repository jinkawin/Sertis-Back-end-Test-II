const User = require('../Model/MongoDB/User')

var generator = require('generate-password');

module.exports = {
	login(req, res){

		// TODO: validate feild wheter there is username or password or not.

		User.findUser(req.body)
			.then(function(user){

				if(!user) return res.status(400).send({
					message: "Incorrect username or password"
				})

				// test a matching password
				user.comparePassword(req.body.password, function(err, isMatch) {
					if (err) res.status(400).send(err);

					var msg;
					if(isMatch){
						require('crypto').randomBytes(48, function(err, buffer) {
							var token;

							user.token = (user.isLogin)?user.token:buffer.toString('base64') // create or get the old one
							user.isLogin = true

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
	logout(){
		// isLogin = false
		// token = ""
	}
}