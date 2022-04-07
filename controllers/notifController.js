const { validationResult } = require('express-validator');

const Notif = require('../models/notifs');


exports.getNotifs = async (req, res, next) => {
    try {
        const notifs = await Notif.find();
        res.status(200).json({ notifs });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}


exports.createNotif = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { title, text } = req.body;
        const imageUrl = `images/${req.file.filename}`;

        if (!imageUrl) {
            const error = new Error('please select an image');
            error.statusCode = 422;
            throw error;
        }

        const notif = new Notif({
            title,
            text,
            imageUrl
        })
        await notif.save()

        res.status(201).json({ message: "notif created", notif })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

