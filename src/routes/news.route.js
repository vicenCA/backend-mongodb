const app = require('express');
const router = app.Router();
const middleware_auth = require('../middlewares/auth');
const newsController = require('../controllers/news.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/uploads'),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
const uploader=multer({storage});


/* NEWS */

/* */
router.post('/add', [middleware_auth.ensureAuth, uploader.single('image')] , newsController.postNews);
/* */
router.put('/update/:id_params', middleware_auth.ensureAuth, newsController.updateNews);
/* */
router.delete('/remove/:id_params', middleware_auth.ensureAuth, newsController.deleteNews);
/* */
router.get('/all', newsController.getAllNews);
/* */
router.get('/:id_params', newsController.getNewsByID);


module.exports = router; 