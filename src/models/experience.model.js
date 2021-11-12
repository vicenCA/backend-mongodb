const moongose = require('mongoose');
const Schema = moongose.Schema;

const LevelSchema = new Schema({
    amountExp: {type: Number, default: 0},
    user_of: {type: Schema.Types.ObjectId, ref: 'User'},
    levelExp: {type: Number, default: 0},
    statusExp: {type: String, default: 'Nuevo'}

});

module.exports = moongose.model('Level', LevelSchema);