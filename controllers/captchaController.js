const captchapng = require('captchapng');

exports.getCaptcha = (req, res) => {
    CAPTCHA_NUM = parseInt(Math.random() * 9000 + 1000);
    const p = new captchapng(80, 30, CAPTCHA_NUM);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    const img = p.getBase64();
    const imageBase64 = Buffer.from(img, "base64");

    res.send(imageBase64);
}