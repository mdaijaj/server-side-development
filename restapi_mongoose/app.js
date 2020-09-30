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

// Require static assets from pu  blic folder
// app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// view engine setup

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dishRouter)
app.use('/', promoRouter)
app.use('/', leaderRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const port=6000;
app.listen(port,()=>{
  console.log("server is listening this port", port)
})

module.exports = app;


