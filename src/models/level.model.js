const moongose = require('mongoose');
const Schema = moongose.Schema;

const LevelSchema = new Schema({
    statusName: {type: String, required: true, unique: true},
    levelNumber: {type: Number, required: true, unique: true},
    minExp: {type: Number, required: true},
    maxExp: {type: Number, required: true}
});

module.exports = moongose.model('Level', LevelSchema);