const app = require('express');
const router = app.Router();
const middleware_auth = require('../middlewares/auth');
const gamificationController = require('../controllers/gamification.controller');

/* ACHIEVEMENT */

/* */
router.post('/add', gamificationController.createAchievement);
/* */
router.put('/update/:id_params', middleware_auth.ensureAuth, gamificationController.updateAchievement);
/* */
router.delete('/remove/:id_params', middleware_auth.ensureAuth, gamificationController.deleteAchievement);
/* */
router.get('/all', gamificationController.getAchievements);
/* */
router.get('/:id_params', gamificationController.getAchievementsById);


/* LEVELS */

/* */
router.post('/add-level', gamificationController.createLvl);
/* */
router.put('/update-level/:id_params', middleware_auth.ensureAuth, gamificationController.updateLvl);
/* */
router.get('/all-level', gamificationController.getLvls);
/* */
router.get('/level/:id_params', gamificationController.getLvl);

module.exports = router; 