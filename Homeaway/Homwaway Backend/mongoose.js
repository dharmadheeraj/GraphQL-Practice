var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://dharma:Dharma.99@ds163382.mlab.com:63382/homeaway', {useNewUrlParser : true} ,(err) =>{
    if (err) throw err;
    console.log("success");
});

module.exports = {mongoose};