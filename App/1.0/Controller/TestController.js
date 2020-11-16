const User = require('../Model/MongoDB/User')

module.exports = {
	hello(req, res){
		// var data = User.findAll().then(function(result){
		// 	res.status(200).send(result);
		// })
		// .catch(function(error){
		// 	console.error(eerrorrr);
		// })
		User.save({
			username : "jinkawin4",
			password: "12345"
		});

		res.status(200).send("yes");
	}
}