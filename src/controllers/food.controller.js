const Food = require('../models/food.model');
const User = require('../models/user.model');
const cloudinary = require('cloudinary');

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
    console.log(request);

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
        let result_file;
        console.log(req.file);
        if (req.file.path) {
            result_file = await cloudinary.v2.uploader.upload(req.file.path);
        }
        else {
            result_file = req.body.image;
        }
        console.log(result_file);

        await Food.findOne({name: request.name}, (err, food) => {
            if (err) {
                res.status(500).send({message: 'An error ocurred while searching.'});
            }
            if (food) {
                res.send({message: 'Name food already is busy.'});
            } else {
                const food = new Food({
                    name: request.name,
                    scientific: request.scientific,
                    type: request.type,
                    subtype: request.subtype,
                    origin: request.origin,
                    world: request.world,
                    image: result_file.secure_url,
                    //falta las otras variables
                });
                console.log(food);
                food.save((err, foodSaved) => {
                    if (err) {
                        res.status(500).send({message: 'An error ocurred while saving.'});
                    }
                    res.status(200).send({food: foodSaved});
                })
            }
        });
    }
}

const updateFood = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;

    Food.findByIdAndUpdate({_id: id_params}, request, (err, food_update) => {
        if (err) {
            res.status(500).send({message: 'An error ocurred while searching.'});
        }
        if (!food_update) {
            res.status(404).send({message: 'Food not found.'});
        } else {
            res.status(200).send({foodUpdate: request, foodBack: food_update});
        }
    });
}

const deleteFood = async (req, res) => {
    const { id_params } = req.params;

    Food.findByIdAndRemove({_id: id_params}, async (err, foodRemoved) => {
        if (err) {
            res.status(500).send({message: 'An error ocurred while searching.'});
        }
        if (!foodRemoved) {
            res.status(404).send({message: 'Food not found.'});
        } else {
            //ELIMINAR REFERENCIAS DE FOOD EN BOOKMARKS DE USUARIOS.
            res.status(200).send({food: foodRemoved});
        }
    });
}

module.exports = {
    getAllFoods,
    getFoodByID,
    postFood,
    updateFood,
    deleteFood
}