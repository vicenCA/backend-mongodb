const Food = require('../models/food.model');
const Recipe = require('../models/recipe.model');
const cloudinary = require('cloudinary');
const fs = require('fs');

/* ============================================================== */
/* ========================== FOOD ============================== */
/* ============================================================== */

const getAllFoods = async (req, res) => {
    await Food.find().then(foods => {
        if (!foods) {
            res.status(400).send({message: 'Foods not found.'});
        } else {
            res.status(200).send({foods});
        }
    }).catch(err => {
        console.log(err);
    });
};

const getFoodByID = async (req, res) => {
    const { id_params } = req.params;

    await Food.findById(id_params).then(food => {
        if (!food) {
            res.status(404).send({message: 'Food not found'});
        } else {
            res.status(200).send({food: food});
        }
    }, err => {
        res.status(500).send({message: err}); 
    });
}
 
const postFood = async (req, res) => {
    const request = req.body;
    const errors = [];
    const file = req.file;

    if (!(request.name)) errors.push('Please, write any name correctly');
    if (!(request.scientific)) errors.push('Please, write any scientific name correctly');
    if (!(request.type)) errors.push('Please, write any type food correctly');
    if (!(request.subtype)) errors.push('Please, write any subtype food correctly');
    if (!(request.origin)) errors.push('Please, write any origin food correctly');
    if (!(request.world)) errors.push('Please, write any world origin food correctly');

    if (errors.length > 0) {
        res.send({errors: errors});
    }
    else {
        await Food.findOne({name: request.name}, async (err, food) => {
            if (err) {
                res.status(500).send({message: 'An error ocurred while searching.'});
            }
            if (food) {
                res.send({message: 'Name food already is busy.'});
            } else {
                let food = new Food({
                    name: request.name,
                    scientific: request.scientific,
                    type: request.type,
                    subtype: request.subtype,
                    origin: request.origin,
                    world: request.world,
                    created_by: request.created_by,
                });

                if (request.calorie) food.calorie = request.calorie;
                if (request.fat) food.fat = food.fat;
                if (request.carbohydrate) food.carbohydrate = request.carbohydrate;
                if (request.protein) food.protein = request.protein;
                if (request.production) food.production = request.production;
                if (request.water) food.water = request.water;
                if (request.time_production) food.time_production = request.time_production;
                if (request.milk) food.milk = request.milk;
                if (request.recipe) food.recipe = request.recipe;
                if (request.vitamin) food.vitamin = request.vitamin;

                if (file) {
                    const result = await cloudinary.v2.uploader.upload(file.path);
                    fs.unlink(req.file.path, (err) => {
                        if (err) throw err;
                        console.log('path was deleted');
                    }); 
                    food.image = result.secure_url;
                }

                await food.save().then(foodSaved => {
                    res.status(200).send({food: foodSaved});
                }).catch(err => {
                    res.status(500).send({err});
                })
            }
        });
    }
}

const updateFood = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;

    Food.findByIdAndUpdate(id_params, request).then(food_update => {
        if (!food_update) {
            res.status(404).send({message: 'Food not found.'});
        } else {
            res.status(200).send({foodUpdate: request, foodBack: food_update});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const deleteFood = async (req, res) => {
    const { id_params } = req.params;

    Food.findByIdAndRemove(id_params).then(foodRemoved => {
        if (!foodRemoved) {
            res.status(404).send({message: 'Food not found.'});
        } else {
            //ELIMINAR REFERENCIAS DE FOOD EN BOOKMARKS DE USUARIOS.
            res.status(200).send({food: foodRemoved});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

/* ============================================================== */
/* ========================= RECIPE ============================= */
/* ============================================================== */

const getAllRecipes = async (req, res) => {
    await Recipe.find().then(recipes => {
        if (!recipes) {
            res.status(400).send({message: 'Recipes not found.'});
        } else {
            res.status(200).send({recipes});
        }
    }).catch(err => {
        console.log(err);
    });
};

const getRecipeByID = async (req, res) => {
    const { id_params } = req.params;

    await Recipe.findById(id_params).then(recipe => {
        if (!recipe) {
            res.status(404).send({message: 'Recipe not found'});
        } else {
            res.status(200).send({recipe});
        }
    }, err => {
        res.status(500).send({message: err}); 
    });
}

const postRecipe = async (req, res) => {
    const request = req.body;
    const errors = [];
    const file = req.file;

    if (!(request.name)) errors.push('Please, write any name correctly');
    if (!(request.body)) errors.push('Please, write any body correctly');
    if (!(request.category)) errors.push('Please, write any category of recipe correctly');
    if (!(request.ingredient)) errors.push('Please, write any ingredient correctly');
  
    if (errors.length > 0) {
        res.send({errors});
    }
    else {

        console.log(request);

        let recipe = new Recipe({
            name: request.name,
            body: request.body,
            user_of: request.user_of,
            category: request.category,
        });

        recipe.ingredient.push(request.ingredient);

        if (file) {
            const result = await cloudinary.v2.uploader.upload(file.path);
            recipe.image = result.secure_url;
            fs.unlink(req.file.path, async (err) => {
                if (err) throw err;
                console.log('path was deleted');
                console.log(recipe);
                await recipe.save().then(recipeSaved => {
                    res.status(200).send({recipe: recipeSaved});
                }).catch(err => {
                    res.status(500).send({err});
                });
            }); 
        }

        // await recipe.save().then(recipeSaved => {
        //     res.status(200).send({recipe: recipeSaved});
        // }).catch(err => {
        //     res.status(500).send({err});
        // });
        
    }
}

const updateRecipe = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;

    Recipe.findByIdAndUpdate(id_params, request).then(recipe_update => {
        if (!recipe_update) {
            res.status(404).send({message: 'Recipe not found.'});
        } else {
            res.status(200).send({recipe: request, recipeUpdate: recipe_update});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const deleteRecipe = async (req, res) => {
    const { id_params } = req.params;

    Recipe.findByIdAndRemove(id_params).then(recipeRemoved => {
        if (!recipeRemoved) {
            res.status(404).send({message: 'Recipe not found.'});
        } else {
            res.status(200).send({recipe: recipeRemoved});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

module.exports = {
    // FOOD
    getAllFoods,
    getFoodByID,
    postFood,
    updateFood,
    deleteFood,
    // RECIPE
    getAllRecipes,
    getRecipeByID,
    postRecipe,
    updateRecipe,
    deleteRecipe
}