const moongose = require('mongoose');
const Schema = moongose.Schema;

const ReactionSchema = new Schema({
    reaction_love: [Schema.Types.ObjectId],
    reaction_amazing: [Schema.Types.ObjectId],
    reaction_sad: [Schema.Types.ObjectId],
    amount_total: {type: Number, default: 0},
    post_of: {type: Schema.Types.ObjectId}
});

module.exports = moongose.model('Reaction', ReactionSchema);