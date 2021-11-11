 const moongose = require('mongoose');
 const Schema = moongose.Schema;
 const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    nickname: {type: String, required: true, lowercase: true},
    email: {type: String, required: true, lowercase: true},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    role: {type: String, default: 'REGISTER_USER'},
    phone: {type: String, default: 0000-0000},
    performance: {type: String},
    birthdate: {type: Date},
    genre: {type: String},
    image: {type: String},
    bookmark: [Schema.Types.ObjectId],
    bookmark_food: [Schema.Types.ObjectId],
    achievement: [Schema.Types.ObjectId],
    stars: [Number],
    followers: [Schema.Types.ObjectId],
    following: [Schema.Types.ObjectId],
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = function (password) {
    const compare = bcrypt.compare(password, this.password);
    return compare;
};

module.exports = moongose.model('User', UserSchema);