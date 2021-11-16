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

/* EXPERIENCE */

/* */
router.post('/add-exp', middleware_auth.ensureAuth, gamificationController.createExperience);
/* */
router.put('/update-exp/:id_params', middleware_auth.ensureAuth, gamificationController.updateExpUser);
/* */
router.get('/all-exp', gamificationController.getExpsByUsers);
/* */
router.get('/experience/:id_params', middleware_auth.ensureAuth, gamificationController.getExpByUser);
/* */
router.delete('/remove-exp/:id_params', middleware_auth.ensureAuth, gamificationController.deleteExperience);

module.exports = router; 