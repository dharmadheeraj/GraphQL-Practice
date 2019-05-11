'use strict';
var bcrypt = require('bcrypt-nodejs');

var crypt = {};

crypt.createHash = function (data, successCallback, failureCallback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            failureCallback(err);
            return err;
        }
        console.log("gen salt successful :" + salt);
        bcrypt.hash(data, salt, null, function (err, hash) {
            if (err) {
                failureCallback(err);
                return err;
            }
            successCallback(hash);
            console.log("hash successful :" + hash);
            return hash;
        });
    });
};

crypt.compareHash = function (data, encrypted, successCallback, failureCallback) {
    bcrypt.compare(data, encrypted, function (err, isMatch) {
        if (err) {
            failureCallback(err);
            return err;
        }
        console.log("comparision successful :" + isMatch);
        successCallback(isMatch);
    });
};

module.exports = crypt;
