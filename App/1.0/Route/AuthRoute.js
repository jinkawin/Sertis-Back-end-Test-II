const AuthController = require('../Controller/AuthController')

module.exports = function(router){
    router.post('/auth', AuthController.login)
}