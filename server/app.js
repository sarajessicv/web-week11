require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.log.bind(console, "MongoDB connection error"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

module.exports = app;
