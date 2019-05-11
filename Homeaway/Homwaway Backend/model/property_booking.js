var mongoose = require('mongoose');

//var mongoose = require ("../mongoose.js");

var Schema = mongoose.Schema;

var Booking = mongoose.model('bookings',{
    booking_id :{
        type : Schema.ObjectId
    },
    user_id : {
        type : String
    },
    owner_id : {
        type : String
    },
    property_id : String,
    property : Object,
    booked_from : {
        type : Date
    },
    booked_to : {
        type : Date
    },
    booked_on : {
        type : Date,
        default: Date.now
    }
});

module.exports = {Booking};