const express = require('express');
const router = express.Router();
const controllerFood = require('../controllers/food.controller');
const middleware_auth = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/uploads'),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
const uploader=multer({storage});

/* GET ALL FOODS IN DB */
router.get('/', controllerFood.getAllFoods);
/* GET FOOD BY ID */
router.get('/:id_params', controllerFood.getFoodByID);
/* ADD FOOD CARD */
router.post('/', [middleware_auth.ensureAuth, uploader.single('image')] ,controllerFood.postFood);
/* UPDATE FOOD CARD */
router.put('/:id_params', middleware_auth.ensureAuth, controllerFood.updateFood);
/* DELETE FOOD CARD */
router.delete('/:id_params', middleware_auth.ensureAuth, controllerFood.deleteFood);


/* GET ALL RECIPES IN DB */
router.get('/all/recipes/wiki', controllerFood.getAllRecipes); 
/* GET RECIPE BY ID */
router.get('/get-id/:id_params', controllerFood.getRecipeByID);
/* ADD RECIPE CARD */
router.post('/add', [middleware_auth.ensureAuth, uploader.single('image')], controllerFood.postRecipe);
/* UPDATE RECIPE CARD */
router.put('/update/:id_params', middleware_auth.ensureAuth, controllerFood.updateRecipe);
/* DELETE RECIPE CARD */
router.delete('/delete/:id_params', middleware_auth.ensureAuth, controllerFood.deleteRecipe);

module.exports = router; 