const express = require('express');
const router = express.Router();
const controllerFood = require('../controllers/food.controller');
const middleware_auth = require('../middlewares/auth');

/* GET ALL FOODS IN DB */
router.get('/', controllerFood.getAllFoods);
/* GET FOOD BY ID */
router.get('/:id_params', controllerFood.getFoodByID);
/* ADD FOOD CARD */
router.post('/', controllerFood.postFood);
/* UPDATE FOOD CARD */
router.put('/updatefood/:id_params', middleware_auth.ensureAuth, controllerFood.updateFood);
/* DELETE FOOD CARD */
router.delete('/:id_params', middleware_auth.ensureAuth, controllerFood.deleteFood);

module.exports = router; 