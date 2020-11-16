var connection = require('@lib/Database/Connection')
var mongoose = connection.get('MongoDB_Local')
var Schema = mongoose.Schema

var CounterSchema = new Schema({
    name: {type: String, required: true},
    seq: { type: Number, default: 0 }
})
var counter = mongoose.model('counter', CounterSchema)

var CardSchema = new Schema({
    card_id: {
        type: Number},
    name: {
        type: String,
        required: [true, 'Field "name" is required.']},
    status: {
        type: String,
        required: [true, 'Field "status" is required.']},
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

CardSchema.pre('save', function(next) {
    var card = this;
    counter.findOneAndUpdate({name: 'cardId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error){
            return next(error)
        }

        console.log("seq: " + counter.seq)

        card.card_id = counter.seq
        next();
    });
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
    findCardById(id){
        return Card.findOne({card_id: id}).exec()
    }
}