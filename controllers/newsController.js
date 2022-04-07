const { validationResult } = require('express-validator');

const News = require('../models/news');


exports.getNews = async (req, res, next) => {
    try {
        const news = await News.find();
        res.status(200).json({ news });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}


exports.createNews = async (req, res, next) => {
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

        const news = new News({
            title,
            text,
            imageUrl
        })
        await news.save()

        res.status(201).json({ message: "notif created", news })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}