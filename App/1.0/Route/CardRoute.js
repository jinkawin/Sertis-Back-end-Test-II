const CardController = require('../Controller/CardController')

module.exports = function(router){
    router.get('/cards', CardController.getAll)
    router.post('/cards', CardController.addNewCard)
    router.put('/cards', CardController.editCard)
    router.delete('/cards', CardController.deleteCard)
}