const express = require('express');
const bodyParser = require('body-parser');

//models
const lead_Dish = require('../models/leaders');
express.urlencoded({ extended: false })

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

//all dish show
leaderRouter.route('/all_promo')
.get((req,res,next) => {
    console.log("get method is worikiing..........")
    lead_Dish.find({})
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
    lead_Dish.create(req.body)
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
    lead_Dish.deleteOne({})
    .then(() => {
        res.statusCode = 200;
        res.json("delete successfully!");
    })
    .catch((err) => next(err));    
});


//default path
leaderRouter.route('/:dishId')
.get((req,res,next) => {
    lead_Dish.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.json(dish);
    })
    .catch((err) => next(err));
})

//not support to post any particular id
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /lead_Dish/'+ req.params.dishId);
})

// dish ip update
.put((req, res, next) => {
    lead_Dish.findByIdAndUpdate(req.params.dishId, {
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
    lead_Dish.findByIdAndRemove(req.params.dishId)
    .then(() => {
        res.statusCode = 200;
        res.json("delete successfully!");
    })
    .catch((err) => next(err));
});

module.exports = leaderRouter;