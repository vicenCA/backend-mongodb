const moongose = require('mongoose');
const Schema = moongose.Schema;

const ReactionSchema = new Schema({
    reaction_love: [Schema.Types.ObjectId],
    amount_love: {type: Number, default: 0},
    reaction_amazing: [Schema.Types.ObjectId],
    amount_amazing: {type: Number, default: 0},
    reaction_sad: [Schema.Types.ObjectId],
    amount_sad: {type: Number, default: 0},
    amount_total: {type: Number, default: 0},
    post_of: {type: Schema.Types.ObjectId}
});

module.exports = moongose.model('Reaction', ReactionSchema);