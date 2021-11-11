const moongose = require('mongoose');
const Schema = moongose.Schema;

const PostSchema = new Schema({
    description: {type: String},
    create_at: {type: Date, default: Date.now},
    image: {type: String},
    user_of: {type: Schema.Types.ObjectId, ref: 'User'}, 
    nametags: [String]
});

module.exports = moongose.model('Post', PostSchema);