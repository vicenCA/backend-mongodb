const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/user.controller');
const middleware_auth = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
const uploader=multer({storage});


router.get('/users', controllerUser.userProove);
/* SIGN UP USER */
router.post('/signup', controllerUser.postUser); 
/* LOGIN USER */
router.post('/login', controllerUser.loginUser);
/* UPDATE USER */
router.put('/:id_params', middleware_auth.ensureAuth, controllerUser.updateUser);
/* UPDATE PROFILE PICTURE */
router.post('/picture/:id_params',uploader.single('image') , controllerUser.updatePictureProfile);
/* ADD FOLLOW OF USER */
router.put('/follow/:id_params', controllerUser.addFollowUser);
/* REMOVE FOLLOW OF USER */
router.put('/unfollow/:id_params', middleware_auth.ensureAuth, controllerUser.removeFollowUser);
/* FIND USER BY ID */
router.get('/id/:id_params', controllerUser.userId);
/* FIND USER BY NICKNAME */
router.get('/usernick/:nickname', controllerUser.userNickName);


module.exports = router;   