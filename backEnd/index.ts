import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from "cors"
const session = require('express-session')

//For env File
dotenv.config();

const sess = {
    secret: 'keyboard cat',
    cookie: {}
}

// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sess.cookie.secure = true // serve secure cookies
// }

const indexRouter = require('./src/routes');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app: Application = express();
const port = process.env.PORT || 8000;

//app.use(session(sess))

app.use(cors())

app.use('/', indexRouter);
app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`);
});
module.exports = app
