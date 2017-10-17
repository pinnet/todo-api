var {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){ return console.log('Unable to connect to db.');}  
    console.log('Connected to DB!');

    db.collection('Users').deleteMany({name: 'Danny', age: 48, location: 'Home'}).then((res) => {
      console.log(res);  
    });
    db.collection('Users').findOneAndDelete({_id:123}).then((res) => {
      console.log(res);  
    });


    //db.close();

});