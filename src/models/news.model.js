const moongose = require('mongoose');
const Schema = moongose.Schema;

const NewsSchema = new Schema({
    name: {type: String, required: true},
    body: {type: String, required: true},
    views: {type: Number, default: 0},
    image: {type: String, required: true},
    category: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    user_of: {type: Schema.Types.ObjectId, ref: 'User'},
    stars: [Schema.Types.ObjectId]
});

module.exports = moongose.model('News', NewsSchema);