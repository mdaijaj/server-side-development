var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session= require('express-session'); // use of session
var FileStore= require('session-file-store')(session);
var passport = require('passport');


var Dishes= require('./models/dishes')
// app.use('/', Dishes);

//routes
var dishRouter= require('./routes/dishRouter')
var promoRouter= require('./routes/promoRouter')
var leaderRouter= require('./routes/leaderRouter')
var usersRouter= require('./routes/users')


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
// app.use(cookieParser('12345-67890-09876-54321'));     //use of cookies
app.use(express.static(path.join(__dirname, 'public')));



// use of session and if use of cookies if you heet one time then store session in headers and save

app.use(session({
  name: 'session_id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));


app.use('/users', usersRouter);
app.use(passport.initialize());
app.use(passport.session());

// function auth (req, res, next) {
//   console.log(req.user);   
//   if (!req.user) {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     next(err);
//   }
//   else {
//     next();
//   }
// }

// app.use(auth)


app.use('/', dishRouter)
app.use('/', promoRouter)
app.use('/', leaderRouter)

const port=6000;
app.listen(port,()=>{
  console.log("server is listening this port", port)
})

module.exports = app;

