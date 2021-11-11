const moongose = require('mongoose');
const Schema = moongose.Schema;

const RecipeSchema = new Schema({
    name: {type: String, required: true},
    body: {type: String, required: true},
    ingredient: [Schema.Types.ObjectId]
});

module.exports = moongose.model('Recipe', RecipeSchema);