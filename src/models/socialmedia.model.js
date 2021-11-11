const moongose = require('mongoose');
const Schema = moongose.Schema;

const SocialMedia = new Schema({
    social: {type: String, required: true},
    nickname: {type: String, required: true},
    user_of: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = moongose.model('SocialMedia', SocialMedia);