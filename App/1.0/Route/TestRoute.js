const TestController = require('../Controller/TestController')

module.exports = function(router){
    router.get('/test', TestController.hello);
}