const bodyParser = require('body-parser');
const express = require('express');

const app=express();

app.use(bodyParser.json());


const dishRouter=express.Router()
app.use('/dishes', dishRouter);
require('./routes/dishRouter');


const leaderRouter=express.Router()
app.use('/dishes', leaderRouter);
require('./routes/leaderRouter');


const promoRouter=express.Router()
app.use('/dishes', promoRouter);
require('./routes/promoRouter');


app.post('/', (req, res, next) => {
   res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
  });

app.all('/all_data', (req,res,next) => {
   res.statusCode = 200;
   console.log("hello")
   res.setHeader('Content-Type', 'text/plain');
   next();
 });

app.get('/dishes', (req,res, next)=>{
   console.log("all_data show")
})

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});   


app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});


const port=5000;
app.listen(port, ()=>{
   console.log("server is listening this port", port)
})
