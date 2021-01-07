const Card = require('@app/Model/MongoDB/Card')

function CardHelper(){
}

CardHelper.prototype.saveNewCard = function(user, cardDetail){
    var card = cardDetail
    card.author = user.username

    return Card.save(card)
}


module.exports = CardHelper