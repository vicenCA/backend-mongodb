const moongose = require('mongoose');
const Schema = moongose.Schema;

const AchievementSchema = new Schema({
    name: {type: String},
    description: {type: String},
    getUser: [Schema.Types.ObjectId]
});

module.exports = moongose.model('Achievement', AchievementSchema);