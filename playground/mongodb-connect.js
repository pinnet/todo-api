var {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){ return console.log('Unable to connect to db.');}  
    console.log('Connected to DB!');

    // db.collection('Todos').insertOne({ text:'Todo today',completed: false}, (err,res) => {
    //     if(err){ return console.log('Unable to insert todo.', err);} 
    //     console.log(JSON.stringify(res.ops, undefined,2)); 
    // })

    // db.collection('Users').insertOne({ 
    //     name :'Diane',
    //     age: 69,
    //     location: 'Home'    
    // }, (err,res) => {
    //         if(err){ return console.log('Unable to insert user.', err);} 
    //         console.log(JSON.stringify(res.ops, undefined,2)); 
    //         console.log(res.ops[0]._id.getTimestamp());
    //     })

db.close();
});