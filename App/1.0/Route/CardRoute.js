const CardController = require('../Controller/CardController')

module.exports = function(router){
    router.get('/cards', CardController.getAll);
}