const express = require('express');
const bodyParser = require('body-parser');
// const path= require('path')
// const mongoose = require('mongoose');

// const app=express()
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//models
const Dishes = require('../models/dishes');
express.urlencoded({ extended: false })

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

//all dish show
dishRouter.route('/home')
.get((req,res,next) => {
    console.log("get method is worikiing..........")
   Dishes.find({})
   .then((data)=>{
       console.log(data)
       res.send(data)
   }).catch((err)=>{
       console.log(err)
   })
})

//post dish or add dish
.post((req, res, next) => {
    console.log("post endpoint is working........")
    console.log(req.body)
    Dishes.create(req.body)
    .then((data)=>{
        console.log(data)
        res.status(200).send(data)
    }).catch((err)=>{
        console.log("while fetch err", err)
        res.json({ error: err })

    })
})

//not support update id not found
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

//delete dish user id
.delete((req, res, next) => {
    Dishes.deleteOne({})
    .then(() => {
        res.statusCode = 200;
        res.json("delete successfully!");
    })
    .catch((err) => next(err));    
});


//default path
dishRouter.route('/:dishId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.json(dish);
    })
    .catch((err) => next(err));
})

//not support to post any particular id
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})

// dish ip update
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//delete dish id
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then(() => {
        res.statusCode = 200;
        res.json("delete successfully!");
    })
    .catch((err) => next(err));
});


//rest api with comments operation
dishRouter.route('/:dishId/comments')
.get((req,res,next) => {
    console.log("get method is worikiing..........")
   Dishes.findById(req.params.dishId)
   .then((data)=>{
        if(data!=null){
            console.log(data.comments)
            res.send(data.comments)
        }else{
            console.log(err)
            res.send(err)
        }
   }).catch((err)=>{
       console.log(err)
   })
})


//comments post by specific id
.post((req, res, next) => {
    console.log("post endpoint is working........")
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
       if(dish!=null){
            dish.comments.push(req.body)
            dish.save()
            .then((data)=>{
                console.log(data)
                res.status(200).send(data)
            })
            .catch((err)=>{
                console.log(err)
            })
       }else{
           console.log(err)
       }
    }).catch((err)=>{
        console.log("while fetch err", err)
        res.json({ error: err })
    })
})

//update not allow in commentts
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

//delete all comments 
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
       if(dish!=null){
           for (var i=(dish.comments.length-1); i>=0; i--){
               dish.comments.id(dish.comments[i]._id).remove()
           }
           dish.save()
           .then((dish)=>{
            console.log("done!")
            res.send("all comments delete successfully!")
           })
           .catch((err)=>{
               console.log(err)
           })
       }else{
           console.log(err)
       }
    }).catch((err)=>{
        console.log("while fetch err", err)
        res.json({ error: err })
    })  
});



//specific by commets id
dishRouter.route('/:dishId/comments/:comment_id')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        dish.comments.forEach(element => {
            if(element._id==(req.params.comment_id)){
                console.log(element)
                res.send(element)
            }
        })
    })
    .catch((err) => next(err));
})

//post id not support
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})

// comments update
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        dish.comments.forEach(element => {
            if(element._id==(req.params.comment_id)){
                element=req.body
                console.log("upddate successfully!")
                res.send(element)
            }
        })
    })
    .catch((err) => next(err));
})

//all comments are deleted
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        dish.comments.forEach(element => {
            element.remove()
        })
    })
    .catch((err) => next(err));
});

module.exports = dishRouter;