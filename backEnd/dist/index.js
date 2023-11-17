"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = require('body-parser');
const cors_1 = __importDefault(require("cors"));
const session = require('express-session');
//For env File
dotenv_1.default.config();
const sess = {
    secret: '',
    cookie: {}
};
// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sess.cookie.secure = true // serve secure cookies
// }
// create application/json parser
const jsonParser = bodyParser.json();
const indexRouter = require('./src/routes');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
//app.use(session(sess))
app.use((0, cors_1.default)());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', indexRouter);
app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`);
});
module.exports = app;
