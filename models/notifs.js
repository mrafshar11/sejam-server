const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const notifSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 5
    },
    text: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Notif', notifSchema);