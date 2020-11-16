var connection = require('@lib/Database/Connection')
var mongoose = connection.get('MongoDB_Local')

var Schema = mongoose.Schema
var CardSchema = new Schema({
    name: {
        type: String,
        required: [true, 'There is no name.']},
    status: {
        type: String,
        required: [true, 'There is no status.']},
    content: {
        type: String,
        required: [true, 'There is no content.']},
    category: {
        type: String,
        required: [true, 'There is no category.']},
    author: {
        type: String,
        required: [true, 'There is no author.']},
});

var Card = mongoose.model('Cards', CardSchema)

module.exports = {
    findAll(){
        return Card
            .find()
            .exec()
    },
    save(data){
        var newCard = new Card(data)
        return newCard.save()
    },
    findCard(user){
        return Card.findOne({username: user.username}).exec()
    }
}