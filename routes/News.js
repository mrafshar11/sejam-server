const express = require('express');
const { body } = require('express-validator');

const newsController = require('../controllers/newsController');
const upload = require('../utils/multer');


const router = express.Router();

router.get("/news", newsController.getNews)

router.post("/news",
    upload.single('imageUrl'),
    [
        body('title')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('text')
            .trim()
            .not()
            .isEmpty()
    ]
    , newsController.createNews
)

module.exports = router;