const { Router } = require('express');

const { getCaptcha } = require('../controllers/captchaController')

const router = new Router();



router.get("/captcha.png", getCaptcha)

module.exports = router;