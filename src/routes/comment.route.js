const app = require('express');
const router = app.Router();
const middleware_auth = require('../middlewares/auth');
const commentController = require('../controllers/comment.controller');

/* */
router.post('/add', middleware_auth.ensureAuth, commentController.addComment);
/* */
router.put('/update/:id_params', middleware_auth.ensureAuth, commentController.updateComment);
/* */
router.delete('/remove/:id_params', middleware_auth.ensureAuth, commentController.removeComment);
/* */
router.get('/:id_params', commentController.getCommentOfPost);

module.exports = router; 