const {mongoose} = require('../server/db/mongoose.js');
const {Todo} = require('../server/models/todo.js');
const {User} = require('../server/models/user.js');

var id = '59e5e84f2061ff8c14652d0d' ;

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo ',todo);
// });

// Todo.findById(id).then((todo) => {
//     console.log('Todo by id',todo);
// });

User.findById(id).then ((user) => {
    if (!user){
        return console.log('id not found');
    }    
    console.log('User by id',user);
}, (e) => {
    console.log(e);
});