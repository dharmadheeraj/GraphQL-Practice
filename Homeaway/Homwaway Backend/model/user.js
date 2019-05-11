var mongoose = require('mongoose');



var Users = mongoose.model('Users',{
    username :{
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String
    },
    email : {
        type : String
    },
    type : {
      type : String,
        enum : ['traveller','owner'],
        lowercase: true,
        trim: true
    },
    created_date : {
        type : Date,
        default: Date.now
    },
    firstname : {
       type : String
    },
    lastname : {
        type : String
    },
    aboutme : {
        type : String
    },
    address : {
        type : String
    },
    address2 : {
        type : String
    },
    country : {
        type : String
    },
    state : {
        type : String
    },
    zip : {
        type : String
    },
    company : {
        type : String
    },
    gender : {
        type : String
    },
    school : {
        type : String
    },
    hometown : {
        type : String
    },
    languages : {
        type : String
    }
});

module.exports = {Users};