const moongose = require('mongoose');
const Schema = moongose.Schema;

const StarSchema = new Schema({
    value: {type: String},
    post_of: {type: Schema.Types.ObjectId, ref: 'Post'},
    post_value: {type: String},
    user_of: {type: Schema.Types.ObjectId, ref: 'User'}

});

module.exports = moongose.model('Star', StarSchema);