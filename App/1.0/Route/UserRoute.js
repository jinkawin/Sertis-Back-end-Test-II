const UserController = require('../Controller/UserController')

module.exports = function(router){
    router.post('/user', UserController.signUp)
}