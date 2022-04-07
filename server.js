const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');

const notifRouter = require('./routes/Notifs');
const newsRouter = require('./routes/News');
const captchaRouter = require('./routes/captchapng');
const { connectToDB } = require('./utils/database');
const { setHeaders } = require('./middleWares/headers');


const app = express();


//load config
dotEnv.config({ path: "./config/config.env" });


//server port
const port = process.env.PORT || 4000;

//static folder
app.use("/images", express.static(path.join(__dirname, "public", "images")));


//middleWares
app.use(express.json());
app.use(setHeaders);

//Routes
app.use("/", notifRouter);
app.use("/", newsRouter);





connectToDB().then(result => {
    console.log('connected to DB')
    app.listen(port, () => {
        console.log(`server runing on port ${port}`)
    })
}).catch(err => {
    console.log(err)
})