var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Dishes= require('./models/dishes')
// app.use('/', Dishes);

//routes
var dishRouter= require('./routes/dishRouter')
var promoRouter= require('./routes/promoRouter')
var leaderRouter= require('./routes/leaderRouter')


//connect to mongodb database
var mongoose= require('mongoose')
const url= 'mongodb://localhost:27017/aijaj_db';
const connect= mongoose.connect(url)
connect.then(()=>{
  console.log("db connected successfully!")
})

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser()); //basic authentication.....
app.use(express.static(path.join(__dirname, 'public')));

//basic authenctication
function auth (req, res, next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  console.log("autheader:-", authHeader)
  if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
  }

  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  console.log("auth:-", auth)
  var user = auth[0];
  var pass = auth[1];
  if (user == 'aijaj' && pass == 'aijaj123') {
    console.log("you are authentication")
    res.send("you are authenticated")
    next(); // authorized
  } 
  else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');      
      err.status = 401;
      next(err);
  }
}

app.use(auth)

app.use('/', dishRouter)
app.use('/', promoRouter)
app.use('/', leaderRouter)


const port=6000;
app.listen(port,()=>{
  console.log("server is listening this port", port)
})

module.exports = app;

