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
						msg = {
							message: "logged in!"
						}
					}else{
						msg = {
							message: "Incorrect username or password"
						}
					}

					res.status(400).send(msg)
				});
			})
			.catch(function(error){
				res.status(400).send(error)
			})
	}
}