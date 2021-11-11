const moongose = require('mongoose');
const Schema = moongose.Schema;

const FollowSchema = new Schema({
    followersOf: {type: Schema.Types.ObjectId, required: true},
    followers: [{ _id: Schema.Types.ObjectId, ref: 'User'}],
    following: [{ _id: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = moongose.model('Follow', FollowSchema);