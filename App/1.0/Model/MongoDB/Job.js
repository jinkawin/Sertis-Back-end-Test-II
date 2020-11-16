var connection = require('@lib/Database/Connection')
var mongoose = connection.get('MongoDB_Local')

var Schema = mongoose.Schema
var JobSchema = new Schema({
    social_channel_id: Number,
    interest: String
});
var Job = mongoose.model('Job', JobSchema)

module.exports = {
    save(jobs){
        return Job.collection.insertMany(jobs)
    },
    deleteAll(){
        return Job
            .deleteMany()
            .exec()
    }
}