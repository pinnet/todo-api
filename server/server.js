require('./config/config.js');


const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/Todo.js');
var {User} = require('./models/User.js'); 
var {authenticate} = require('./middleware/authenticate.js');

 var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc); 
    }, (e) => {
        res.status(400).send(e);   
    }); 

});
app.get('/todos',(req,res) => {
    Todo.find().then((todos) => {
        if (!todos) { return res.status(404).send();}
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
       return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo){ return res.status(404).send(); }
        res.send({todo})
    }, (e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
       return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){ return res.status(404).send(); }
        res.send({todo});
    }, (e) => {
        res.status(400).send();
    });
})

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);

    if (!ObjectID.isValid(id)){
       return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.competed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo) => {
        if(!todo){ return res.status(404).send(); }
        res.send({todo});
    }, (e) => {
        res.status(400).send();
    });
})

//                                user section

app.post('/users',(req,res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);
    user.save().then(() => {
       return user.generateAuthToken();
    }).then((token) => {
       res.header('x-auth',token).send(user); 
    }).catch((e) => {
        res.status(400).send(e);   
    }) 
});

module.exports = {authenticate};

app.get('/users/me', (req,res) => {
    var token = req.header('x-auth');
    //console.log(token);
    User.findByToken(token).then((user) => {
       if(!user){
           return Promise.reject();
        }
        
      res.send(user);
    
    }).catch ((e) => {
        res.status(401).send();
    });
});


if(!module.parent){ 
app.listen(port, () => {
    console.log(`Started on ${port}`);
});}

module.exports = { app };