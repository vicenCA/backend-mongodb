const app = require('express');
const router = app.Router();
const middleware_auth = require('../middlewares/auth');
const interactionController = require('../controllers/interaction.controller');

/* */
router.post('/generate/', middleware_auth.ensureAuth, interactionController.generateInteractionUser);
/* */
router.put('/:id_params', middleware_auth.ensureAuth, interactionController.updateInteraction);
/* */
router.get('/:id_params', middleware_auth.ensureAuth , interactionController.getInteractionUser);
/* */
router.delete('/remove/:id_params', middleware_auth.ensureAuth, interactionController.deleteInteractionUser);

module.exports = router;