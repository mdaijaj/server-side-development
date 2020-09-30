const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.json());

// const Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

require('./routes/dishRouter')
//endpoint is not working issue of path.....

const port=5000;
app.listen(port, ()=>{
   console.log("server is listening this port", port)
})
