const MongoClient= require('mongodb').MongoClient;
const assert= require('assert')
const dboper=require('./routes/operation')

//credential
const url= "mongodb://localhost:27017/";
const dbname= "coursera"

MongoClient.connect(url)
.then((client)=>{
    console.log("server is connected successfully!")
    const db=client.db(dbname)

    //Node Callback Hell and Promises
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},"dishes")
    .then((result) => {
        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, "dishes") 
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" },{ description: "Updated Test" }, "dishes")
            .then((result) => {
                console.log("Updated Document:\n", result.result);

                dboper.findDocuments(db, "dishes")
                .then((docs) => {
                    console.log("Found Updated Documents:\n", docs);
             
                    // db.dropCollection("dishes")
                    // .then((result) => {
                    //     console.log("Dropped Collection: ", result);
                    //     client.close();
                    // })
                });
            });
        });
    });
})
.catch((err)=> console.log(err))


    
    
















   // //insert data
   // collection.insertOne({"course_name": "nodejs", "description": "well content"}, (err, result)=>{
   //   assert.equal(err, null);
   //   console.log(" insert successfully \n")
   //   console.log(result.ops)
   
   // //query data
   //   collection.find({}).toArray((err, docs)=>{
   //      assert.equal(err, null)
   //      console.log("data found", docs)

   // // drop data
   //    db.dropCollection('courses', (err, result)=>{
   //       assert.equal(err, null);
   //       client.close();
   //    })
   //   })
   // })
// })
