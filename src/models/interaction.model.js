const moongose = require('mongoose');
const Schema = moongose.Schema;

const InteractionSchema = new Schema({
    reaction_love: [Schema.Types.ObjectId],
    reaction_amazing: [Schema.Types.ObjectId],
    reaction_sad: [Schema.Types.ObjectId],
    bookmarks: [Schema.Types.ObjectId],
    wiki: [Schema.Types.ObjectId],
    questions: [Schema.Types.ObjectId],
    news: [Schema.Types.ObjectId],
    user_of: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = moongose.model('Interaction', InteractionSchema);