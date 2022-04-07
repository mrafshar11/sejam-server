const multer = require('multer');
const uuid = require('uuid').v4;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/")
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}_${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true)
    } else {
        cb(new Error("Accepted images: jpeg,png"), false)
    }
};

const upload = multer({ dest: "images/", storage, fileFilter });

module.exports = upload;