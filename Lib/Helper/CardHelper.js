const Card = require('@app/Model/MongoDB/Card')

var verificationHelper = require('@lib/Helper/VerificationHelper')

function CardHelper(){
}

CardHelper.prototype.saveNewCard = function(user, cardDetail){
    var card = cardDetail
    card.author = user.username

    return Card.save(card)
}

CardHelper.prototype.updateCard = function(user, updateDetail){
    return new Promise((resolve, reject) => {
        Card.findCardById(updateDetail.card_id)
            .then(function(card){

                if(verificationHelper.isUserAbleToEditCard(user, card)){
                    updateAndSaveCard(card, updateDetail)
                }else{
                    reject("Permission denied")
                }

                resolve(card)
            })
    });
}

CardHelper.prototype.deleteCard = function(user, cardDetail){
    return new Promise((resolve, reject) => {
        Card.findCardById(cardDetail.card_id)
            .then(function(card){
                if(!card){
                    reject("Cannot find the given card")
                }

                Card.deleteCardById(cardDetail.card_id)

                resolve(card)
            })
    });
}

function updateAndSaveCard(card, updateDetail){
    card.card_id = updateDetail.card_id
    card.name = updateDetail.name
    card.status = updateDetail.status
    card.content = updateDetail.content
    card.category = updateDetail.category
    card.save()
}

module.exports = CardHelper