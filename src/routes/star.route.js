const app = require('express');
const router = app.Router();
const middleware_auth = require('../middlewares/auth');
const StarController = require('../controllers/star.controller');

/* GENERATE STAR OF POST BY USER */
router.post('/generate/', middleware_auth.ensureAuth, StarController.generateStarsPost);
/* UPDATE STARS OF POST BY USER */
router.put('/:id_params', middleware_auth.ensureAuth, StarController.updateStars);
/* GET STARS OF USER AND POST*/
router.get('/:id_params/:id_post', middleware_auth.ensureAuth, StarController.getStarsofUserPost);
/* GET STARS OF USER */
router.get('/user/stars/:id_params', middleware_auth.ensureAuth, StarController.getStarsofUser);
/* GET STARS OF POST */
router.get('/post/:id_params', StarController.getStarsofPost);
/* DELETE STARS */
router.delete('/remove/:id_params', middleware_auth.ensureAuth, StarController.deleteStars);

module.exports = router;