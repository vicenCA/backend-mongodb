const moongose = require('mongoose');
const Schema = moongose.Schema;

const CommunitySchema = new Schema({
    question: {type: String, required: true},
    description: {type: String},
    views: {type: Number, default: 0},
    user_of: {type: Schema.Types.ObjectId, ref: 'User'}, 
    nametags: [String],
    created_at: {type: Date, default: Date.now},
});

module.exports = moongose.model('Community', CommunitySchema);