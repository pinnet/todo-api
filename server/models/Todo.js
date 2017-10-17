var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text: {
        type: String,
        requred: true,
        trim: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};