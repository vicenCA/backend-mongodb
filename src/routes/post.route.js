const app = require('express');
const router = app.Router();
const middleware_auth = require('../middlewares/auth');
const postController = require('../controllers/post.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
const uploader=multer({storage});

/* GET ALL POSTS */
router.get('/all', middleware_auth.ensureAuth, postController.getPosts);
/* GET POSTS OF USER */
router.get('/user/:id_params', postController.getPostsByUser); 
/* GET POST BY ID POST*/
router.get('/user/post/:id_params', postController.getPostByID);
/* GET POST BY ID FOLLOWING*/
router.get('/following/:id_params', middleware_auth.ensureAuth, postController.getPostsByFollowing);
/* POST A POST WITH ID USER */
router.post('/upload/:id_params', [middleware_auth.ensureAuth, uploader.single('image')], postController.postPost);
/* UPDATE POST BY ID POST*/
router.put('/update/:id_params', middleware_auth.ensureAuth, postController.updatePostByID);
/* DELETE A POST BY ID POST*/
router.delete('/remove/:id_params', middleware_auth.ensureAuth, postController.deletePost);
 
module.exports = router;