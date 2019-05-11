var mongoose = require('mongoose');

//var mongoose = require ("../mongoose.js");

var Property = mongoose.model('properties',{
    owner_id :{
        type : String
    },
    name : {
        type : String
    },
    type : {
        type : String,
        enum : ['Appartment','Villa','House']
    },
    description : {
        type : String
    },
    place : {
        type : String
    },
    capacity : {
        type : Number,
        min : 1
    },
    bed : {
        type : Number,
        min : 1
    },
    bath : {
        type : Number,
        min : 1
    },
    price: {
        type : Number,
        min : 1
    },
    from_date : {
        type : Date
    },
    to_date : {
        type : Date
    },
    booking_options : {
        type : String
    },
    min_stay : {
        type : Number
    }
});

module.exports = {Property};