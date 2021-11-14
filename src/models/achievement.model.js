const moongose = require('mongoose');
const Schema = moongose.Schema;

const AchievementSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    getUser: [Schema.Types.ObjectId],
    image: {type: String, default: 'https://res.cloudinary.com/refooks/image/upload/v1636758291/sin-foto-refooks_oz1dyi.jpg'}
});

module.exports = moongose.model('Achievement', AchievementSchema);