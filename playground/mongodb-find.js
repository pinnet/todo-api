var {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){ return console.log('Unable to connect to db.');}  
    console.log('Connected to DB!');


    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
     },(err) => {
         console.log('Unable to fetch todos.', err);   
     });
   
// db.collection('Todos').find({_id: new ObjectID('59e52e32e5a21521dc8f28b2')}).toArray().then((docs) => {
//    console.log('To Dos');
//    console.log(JSON.stringify(docs,undefined,2));
// },(err) => {
//     console.log('Unable to fetch todos.', err);   
// });



//db.close();
});