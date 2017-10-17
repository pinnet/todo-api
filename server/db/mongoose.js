var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };

// var User = mongoose.model('User',{
//     email: {
//         type: String,
//         requred: true,
//         minlenth: 1,
//         trim: true
//     }
    
// });
// var Todo = mongoose.model('Todo',{
//     text: {
//         type: String,
//         requred: true,
//         minlenth: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });
// newTodo.save().then((doc) => {
//     console.log('Save Todo', doc) 
// }, (e) => {
//    console.log('Unable to save model') 
// });
