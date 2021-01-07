const Card = require('@app/Model/MongoDB/Card')

function CardHelper(){
}

CardHelper.prototype.saveNewCard = function(user, cardDetail){
    var card = cardDetail
    card.author = user.username

    return Card.save(card)
}

CardHelper.prototype.updateCardByCardId = function(user, cardDetail){
    return new Promise((resolve, reject) => {
        Card.findCardById(cardDetail.card_id)
            .then(function(card){
                console.log(card)
                if(!card){
                    reject("Cannot find the given card")
                }

                // update field and save
                card.card_id = cardDetail.card_id
                card.name = cardDetail.name
                card.status = cardDetail.status
                card.content = cardDetail.content
                card.category = cardDetail.category
                card.save()

                resolve(card)
            })
    });
}

// function getCard(password){
//     return new Promise((resolve, reject) => {
//         this.currentUser.comparePassword(password, function(err, isMatch) {
//             resolve(isMatch)
//         })
//     });
// }

module.exports = CardHelper