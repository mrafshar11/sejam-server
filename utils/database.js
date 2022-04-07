const mongoose = require("mongoose");

exports.connectToDB = () => {
    return mongoose.connect("mongodb://localhost/Sejam",);
};

