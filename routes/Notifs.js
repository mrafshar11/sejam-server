const express = require('express');
const { body } = require('express-validator');

const notifController = require('../controllers/notifController');
const upload = require('../utils/multer');


const router = express.Router();

router.get("/notif", notifController.getNotifs)

router.post("/notif",
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
    , notifController.createNotif
)

module.exports = router;