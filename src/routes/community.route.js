const app = require('express');
const router = app.Router();
const middleware_auth = require('../middlewares/auth');
const communityController = require('../controllers/community.controller');
/* */
router.post('/add', middleware_auth.ensureAuth, communityController.addCommunityQuestion);
/* */
router.put('/update/:id_params', middleware_auth.ensureAuth, communityController.updateCommunityQuestion);
/* */
router.delete('/remove/:id_params', middleware_auth.ensureAuth, communityController.removeComunnityQuestion);
/* */
router.get('/all', communityController.getCommunityQuestions);
/* */
router.get('/:id_params', communityController.getCommunityQuestionById);

module.exports = router; 