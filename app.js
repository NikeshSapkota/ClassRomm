var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mydb';
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db) => {
    console.log("Connected to mongodb server");
}, (err) => { console.log(err); });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var heroesRouter = require('./routes/heroes');
var villainsRouter = require('./routes/villains');

var app = express();

app.use(logger('dev'));
app.use(express.json()); // same as bodyParser.json()
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


function auth(req, res, next) {
    console.log(req.headers);
    let authHeader = req.headers.authorization;
    if (!authHeader) {
    let err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
    }
    let auth = new Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
    let username = auth[0];
    let password = auth[1];
    // Default username and password
    if(username == 'admin' && password== 'admin') {
    next(); // authorized
    } else {
    let err = new Error('You are not authenticated!');
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
    }
}
app.use(auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/heroes', heroesRouter);
app.use('/villains', villainsRouter);
module.exports = app;
