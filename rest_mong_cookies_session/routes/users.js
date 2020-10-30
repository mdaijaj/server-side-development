var express=require('express')
const bodyParser=require('body-parser');
const { route } = require('./dishRouter');
const User = require('../models/user');
var router=express.Router();

router.use(bodyParser.json());

//default
router.get('/', (req,res,next)=>{
   res.send("response with a  resource")
});

//signup endpoint
router.post('/signup', (req, res, next)=>{
   User.findOne({username: req.body.username})
   .then((data)=>{
      if(data!=null){
         var err= new Error("User" + req.body.username + "allready exits!")
         err.status= 403;
         console.log(data)
         res.send(data)
         next(err)
      }else{
         return User.create({
            username: req.body.username,
            password: req.body.password
         })
      }
   })
   .then((user)=>{
      console.log(user)
      res.statusCode=200;
      res.setHeader('Content-Type', 'application/json');
      res.json({status: "Registration successfully!", user: user})
   })
   .catch((err)=>{
      console.log(err)
   })
})


//login endpoint
router.post('/login', (req, res, next)=>{
   if(!req.session.user){
      var authHeader= req.headers.authorization;
      if(!authHeader){
         var err= new Error("you are not authenticated")
         res.setHeader('WWW-Authenticate', 'Basic');
         err.status=401;
         return next(err);
      }
      var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      var username = auth[0];
      var password = auth[1];

      User.findOne({username: username})
      .then((user)=>{
         if(user==null){
            var err = new Error('User ' + username + ' does not exist!');
            err.status = 403;
            return next(err);
         } 
         else if (user.password !== password) {
            var err = new Error('Your password is incorrect!');
            err.status = 403;
            return next(err);
          }
         else if(user.username == username && user.password == password){
            req.session.user = 'authenticated';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/json');
            console.log("you are login sucesssfully!")
            res.end('You are authenticated!')
         }
      })
      .catch((err)=>{
         console.log(err)
      })
   }else{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('You are already authenticated!');
   }
})


//logout web page
router.get('/logout', (req,res)=>{
  if(req.session){
     req.session.destroy();
     res.clearCookie('session-id')
     res.redirect('/');
  }else{
      var err = new Error('You are not logged in!');
      err.status = 403;
      next(err);
  }
});


module.exports= router;
