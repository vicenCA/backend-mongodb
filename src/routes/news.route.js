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

/* UPLOAD NEWS CARD */
router.post('/add', [middleware_auth.ensureAuth, uploader.single('image')] , newsController.postNews);
/* UPDATE NEWS CARD */
router.put('/:id_params', middleware_auth.ensureAuth, newsController.updateNews);
/* UPDATE VIEWS NEWS */
router.put('/views/:id_params', newsController.updateNewsViews);
/* REMOVE NEWS CARD */
router.delete('/remove/:id_params', middleware_auth.ensureAuth, newsController.deleteNews);
/* GET ALL NEWS CARD */
router.get('/all', newsController.getAllNews);
/* GET ONE NEWS CARD BY ID */
router.get('/:id_params', newsController.getNewsByID);


module.exports = router; 