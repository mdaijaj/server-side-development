const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

//connect to server
const url = 'mongodb://localhost:27017/';
const connect = mongoose.connect(url);
connect.then(() => {
    console.log('Connected correctly to server');
    
    //insert data into database
    Dishes.create({
        name: "kisi aur",
        description: "hello world i will change myself"
    })
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });
        return dish.save();
    })
   
    //delete data
    .then((dish) => {
        console.log(dish);
        return Dishes.find({}).exec();
    })
    .then((dish)=>{
        console.log(dish)
        return Dishes.deleteOne({});

    })
    
    // update data
    // .then((dish) => {
    //     console.log("dish:--", dish);
    //     return Dishes.findByIdAndUpdate(dish._id, {
    //         $set: { description: 'Updated test'}
    //     },{ 
    //         new: true 
    //     })
    //     .exec();
    // })
    .then((dish) => {
        console.log(dish);
    })
    
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log("name duplicate now allowed please change name...\n ", err);
    });

});