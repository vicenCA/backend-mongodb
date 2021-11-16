const app = require('express');
const router = app.Router();
const middleware_auth = require('../middlewares/auth');
const reactionController = require('../controllers/reaction.controller');

/* */
router.post('/generate/', middleware_auth.ensureAuth, reactionController.generateReactionPost);
/* */
router.put('/:id_params', middleware_auth.ensureAuth, reactionController.updateReaction);
/* */
router.get('/:id_params', reactionController.getReacionOfPost);
/* */
router.delete('/remove/:id_params', middleware_auth.ensureAuth, reactionController.deleteReactionOfPost);

module.exports = router;