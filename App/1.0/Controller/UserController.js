const User = require('../Model/MongoDB/User')

var generator = require('generate-password');

module.exports = {
	signUp(req, res){
		var password = generator.generate({
			length: 8,
			numbers: true
		});

		var data = {
			username: req.body.username,
			password: req.body.username + "_" + password
		}

		User.save(data)
			.then(function(result){
				res.status(200).send(data)
			})
			.catch(function(error){
				var msg;
				if (error.name === 'MongoError' && error.code === 11000) {
					msg = {
						message: "User is already existed!"
					}
				} else {
					msg = {
						message: "There is no username."
					}
				}

				res.status(400).send(msg)
			})

	}
}