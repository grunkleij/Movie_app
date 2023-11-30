const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    movieWatchList:{
        type: [String]
    }
})

const User=mongoose.model('User',userSchema);

module.exports = User