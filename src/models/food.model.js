const moongose = require('mongoose');
const Schema = moongose.Schema;

const FoodSchema = new Schema({
    name: {type: String, required: true},
    scientific: {type: String, required: true},
    type: {type: String, required: true},
    subtype: {type: String, required: true},
    origin: {type: String, required: true},
    world: {type: String, required: true},
    image: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    created_by: {type: Schema.Types.ObjectId, ref: 'User', default: 'No indicado.'},
    update_at: {type: Date, default: Date.now},
    production: [String],
    calorie: {type: String},
    fat: {type: String},
    carbohydrate: {type: String},
    protein: {type: String},
    water: {type: String},
    time_production: {type: String},
    milk: {type: String},
    medicine: {type: String},
    recipe: {type: String},
    vitamin: {type: String},
    stars: [Schema.Types.ObjectId]
});   

module.exports = moongose.model('Food', FoodSchema);