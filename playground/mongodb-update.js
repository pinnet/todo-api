var {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){ return console.log('Unable to connect to db.');}  
    console.log('Connected to DB!');

    
    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID("59e5b9310dcb13631b3539b9")},{
    //     $set:{completed: true}
    // },{
    //     returnOriginal: false
    // }).then((res) => {
    //   console.log(JSON.stringify(res,undefined,2));  
    // });
    db.collection('Users').findOneAndUpdate({_id: new ObjectID("59e5ce5d0dcb13631b354218")},{
            $set:{name: 'Danny'},
            $inc:{ age: 1}
        },{
            returnOriginal: false
        }).then((res) => {
          console.log(JSON.stringify(res,undefined,2));  
        });

    //db.close();

});