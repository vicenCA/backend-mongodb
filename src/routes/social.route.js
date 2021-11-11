const express = require('express');
const router = express.Router();
const controllerSocialMedia = require('../controllers/social.controller');
const middleware_auth = require('../middlewares/auth');

/* GET ALL SOCIAL MEDIA */
router.get('/:id_params', controllerSocialMedia.getAllSMbyUser);
/* ADD SOCIALMEDIA */
router.post('/:id_params', middleware_auth.ensureAuth, controllerSocialMedia.postSocialMedia);
/* UPDATE SOCIAL MEDIA */
router.put('/:id_params', middleware_auth.ensureAuth, controllerSocialMedia.updateSocialMedia);
/* DELETE SOCIAL MEDIA */
router.delete('/:id_params', middleware_auth.ensureAuth, controllerSocialMedia.deleteSocialMedia);

module.exports = router; 