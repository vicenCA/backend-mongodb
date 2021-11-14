const express = require('express');
const router = express.Router();

router.get('/register_users', (req, res) => {
    res.render('image_form');
});

router.get('/achievement-part', (req, res) => {
    res.render('achievement');
})

module.exports = router;