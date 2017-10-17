var mongoose = require('mongoose');

var User = mongoose.model('User',{
    email: {
        type: String,
        requred: true,
        minlenth: 1,
        trim: true
    }
});
module.exports = { User };
