var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session= require('express-session'); // use of session
var FileStore= require('session-file-store')(session);

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


// // use of cookies and if use of cookies if you heet one time then store coookies in headers and save
// function auth(req, res, next){
//   console.log("headers:--",req.signedCookies)
  
//   if(!req.signedCookies.user){
//     var authHeader=req.headers.authorization;
//     console.log("authHeader:-", authHeader)
//     if(!authHeader){
//       var err= new Error("you are not authenticated")
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status=401;
//       next(err);
//     }

//     var auth= new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
//     console.log("auth:-", auth)
//     var user=auth[0];
//     var password=auth[1];
//     if(user=="aijaj" && password=="aijaj123"){
//       console.log("authorized successfully!")
//       res.cookie('user', 'aijaj', {signed: true})
//       next();
//     }
//     else{
//       var err= new Error("you are not authenticated")
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status=401;
//       next(err);
//     }
//   }else{
//     if(req.signedCookies.user==="aijaj"){
//       console.log("done")
//       next();
//     }else{
//       var err= new Error("you are not authenticated")
//       err.status=401;
//       next(err);
//     }
//   }
// }

// use of session and if use of cookies if you heet one time then store session in headers and save

app.use(session({
  name: 'session_id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

// function auth(req, res, next){
//   console.log("headers:--", req.session)
  
//   if(!req.session.user){
//     var authHeader=req.headers.authorization;
//     if(!authHeader){
//       var err= new Error("you are not authenticated")
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status=401;
//       next(err);
//     }

//     var auth= new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
//     console.log("auth:-", auth)
//     var user=auth[0];
//     var password=auth[1];
//     if(user=="aijaj" && password=="aijaj123"){
//       console.log("authorized successfully!")
//       req.session.user= "aijaj";
//       next();
//     }
//     else{
//       var err= new Error("you are not authenticated")
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status=401;
//       next(err);
//     }
//   }else{
//     if(req.session.user==="aijaj"){
//       console.log("done")
//       next();
//     }else{
//       var err= new Error("you are not authenticated")
//       err.status=401;
//       next(err);
//     }
//   }
// }

// part 2
app.use('/users', usersRouter);

function auth (req, res, next) {
    console.log(req.session);

  if(!req.session.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
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

