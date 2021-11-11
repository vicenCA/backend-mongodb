const moongose = require('mongoose');
const Schema = moongose.Schema;

const CommentSchema = new Schema({
    body: {type: String},
    vote_p: {type: Number, default: 0},
    vote_p_user: [Schema.Types.ObjectId],
    vote_n: {type: Number, default: 0},
    vote_n_user: [Schema.Types.ObjectId],
    create_at: {type: Date, default: Date.now},
    post_of: {type: Schema.Types.ObjectId, ref: 'Post'},
    user_of: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = moongose.model('Comment', CommentSchema);