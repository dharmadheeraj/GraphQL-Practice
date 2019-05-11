//import * as mysql from "mysql";
var {Users} =require("./model/user");

var cookieParser = require('cookie-parser');
// var mysql = require('mysql');
var express = require('express');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

var path = require('path');
var logger = require('morgan');

//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');

var cors = require('cors');

var pool = require('./connection');

var app = express();

var crypt = require('./crypt');

var mongoose = require ("./mongoose");


app.use(logger('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

//use express session to maintain session data
app.use(session({
    secret              : 'homeaway_dharma',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));





// app.use(bodyParser.urlencoded({
//     extended: true


//Allow Access Control
/*
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
*/

const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body.propname);
        const dir = `./uploads/property/${req.body.propname}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
            console.log(file);
        const newFilename = `${file.originalname}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage });

app.post('/testcrypt/:id',function(req,res){

    crypt.createHash()
})


// app.post('/loginwithoutpool',function(req,res){
//     var username = req.body.username;
//     var password = req.body.password;
//     var sql = "SELECT user_id,username,password FROM user_mdb WHERE username = " +
//         mysql.escape(username) + "and password = " + mysql.escape(password);
//
//     var connection = mysql.createConnection({
//         port: '3306',
//         host: '127.0.0.1',
//         user: 'homeaway_user',
//         password: 'Homeaway.99',
//         database: 'homeaway_user'
//         // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
//     });
//
//     /*pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{ */
//         connection.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                     console.log(err);
//                 }else{
//                     // if(crypt.compareHash(password,result[0].password)){
//                     if(result.length > 0) {
//                         res.cookie('cookie', req.body.type, {maxAge: 900000, httpOnly: false, path : '/'});
//                         res.cookie('userid', result[0].user_id, {maxAge: 900000, httpOnly: false, path : '/'});
//                         res.cookie('username', result[0].username, {maxAge: 900000, httpOnly: false, path : '/'});
//                         res.writeHead(200, {
//                             'Content-Type': 'text/plain'
//                         })
//                         res.end("Successful");
//                         console.log("successful");
//                     }
//                     else
//                     {
//                         res.writeHead(200, {
//                             'Content-Type': 'text/plain'
//                         })
//                         res.end("UnSuccessful");
//                         console.log("Unsuccessful");
//                     }
//                 }
//             });
//     });
//
//
//
app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(password);
    console.log(username);


    Users.find({
        username:username
    }).then((docs)=>{
        if(docs.length !== 0) {
            crypt.compareHash(password,docs[0].password, (isMatch,err) => {
                if(isMatch)
                {
                    res.cookie('cookie', docs[0].type, {maxAge: 900000, httpOnly: false, path: '/'});
                    res.cookie('userid', docs[0]._id.toString(), {maxAge: 900000, httpOnly: false, path: '/'});
                    res.cookie('username', docs[0].username, {maxAge: 900000,httpOnly: false,path: '/'});
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(JSON.stringify(docs));
                    res.end("Successful");
                    console.log("successful",docs);
                }
                else{
                    res.writeHead(201, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("UnSuccessful");
                    console.log("Sent Invalid result");
                    console.log(err);
                }
            }, (err) => {
                res.writeHead(202, {
                    'Content-Type': 'text/plain'
                })
                res.end("UnSuccessful");
                console.log("Sent Invalid result");
                console.log(err);
            });

        }
        else
        {
            res.writeHead(202, {
                'Content-Type': 'text/plain'
            })
            res.end("UnSuccessful");
            console.log("Sent Invalid result");
            console.log(err);
        }


    })
});


app.post('/createuser',function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var type = req.body.type;

    crypt.createHash(password, (hash) => {

        Users.create(
            {
                username : username,
                password : hash,
                email : email,
                type : type
            },(err,doc) => {
                if(err)
                {
                    res.writeHead(201,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Unable to create user");
                    console.log("Unable to create user");
                    console.log(err);
                }
                else
                {
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Successful");
                    console.log("Successful creation of user : " + doc.insertedId);
                }

            });

    });
});
//
// app.post('/searchproperty',function(req,res) {
//
//
//     console.log("Inside getProperty Post Request");
//     var place = "%" + req.body.place + "%";
//     var from = req.body.from;
//     var to = req.body.to;
//     var count = req.body.count;
//     var sql = "select * from property_list where place like(" +
//         mysql.escape(place) + ")and   from_date<= " + mysql.escape(from) + " and " + mysql.escape(to) + " <= to_date  and capacity >" + mysql.escape(count);
//
//     console.log(sql);
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end(JSON.stringify(result));
//                 }
//             });
//         }
//     });
// });
//
// app.post('/getpropertypic/:file(*)',(req, res) => {
//         console.log("Inside get profile pic");
//         var file = req.params.file;
//         var fileLocation = path.join(__dirname + '/uploads/property/' + file );
//         var base64img = [];
//
//         fs.readdirSync(fileLocation).forEach(file => {
//             console.log(file);
//             var img = fs.readFileSync(fileLocation + '/' + file);
//             base64img.push(new Buffer(img).toString('base64'));
//
//         })
//
//         res.writeHead(200, {'Content-Type': 'image/jpg' });
//         res.end(JSON.stringify(base64img));
//
//     });
//
//     app.post('/getpropertypicsingle/:file(*)',(req, res) => {
//         console.log("Inside get profile pic");
//         var file = req.params.file;
//         var fileLocation = path.join(__dirname + '/uploads/property/' + file );
//         var base64img = '';
//
//         fs.readdirSync(fileLocation).forEach(file => {
//             console.log(file);
//             var img = fs.readFileSync(fileLocation + '/' + file);
//             base64img = new Buffer(img).toString('base64');
//
//         })
//
//         res.writeHead(200, {'Content-Type': 'image/jpg' });
//         res.end(base64img);
//
//     });
//
//
//
//
// app.get('/getsingle',function (req,res) {
//     console.log('Inisde GET SINGLE');
//     console.log(req.query.id);
//
//     var sql = "select * from property_list where num =" +  req.query.id;
//     console.log(sql);
//
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     console.log(result[0]);
//                     var out = {
//                         "ans" : result
//                     }
//                     res.end(JSON.stringify(out));
//                 }
//             });
//         }
//     });
//
// });
//
// app.get('/getprofile',function (req,res) {
//     console.log('Inisde GET profile');
//     console.log(req.query.id);
//     var sessionData = req.session.name;
//
//     console.log("Session data "+ sessionData);
//     var sql = "select * from user_mdb where user_id =" +  req.query.id;
// //    console.log(sql);
//
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     console.log(result[0]);
//                     var out = {
//                         "ans" : result
//                     }
//                     res.end(JSON.stringify(out));
//                 }
//             });
//         }
//     });
//
// });
//
// app.post('/updateprofile',upload.single('files'), (req, res) => {
//     console.log("Inisde post profile update");
//     console.log("Req File : ",req.file);
//
//     console.log("Req Data : ",req.body.profiledata);
//
//     var data = JSON.parse(req.body.profiledata);
//
//     var sql = "update user_mdb set firstname = " + mysql.escape(data.firstname) + "," +
//          'lastname = ' + mysql.escape(data.lastname) + "," +
//          'aboutme = ' + mysql.escape(data.aboutme) + "," +
//         'address = ' + mysql.escape(data.address) + "," +
//         'address2 = ' +  mysql.escape(data.address2) + "," +
//          'country = ' + mysql.escape(data.country) + "," +
//         'state = ' + mysql.escape(data.state) + "," +
//         'zip = ' + mysql.escape(data.zip) + "," +
//         'company = ' +  mysql.escape(data.company) + "," +
//         'gender = ' + mysql.escape(data.gender) + "," +
//         'school = ' + mysql.escape(data.school) + "," +
//         'hometown = ' + mysql.escape(data.hometown) + "," +
//         'languages = ' + mysql.escape(data.languages) + " where user_id =" + mysql.escape(data.userid);
//
//
//     console.log(sql);
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Successful");
//                     console.log("Successful upadted");
//                 }
//             });
//         }
//     });
// });
//
//
// app.get('/getaccount',function (req,res) {
//     console.log('Inisde GET account');
//     console.log(req.query.id);
//
//     var sql = "select email from user_mdb where user_id =" +  req.query.id;
// //    console.log(sql);
//
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     // console.log(result[0]);
//                     var out = {
//                         "ans" : result
//                     }
//                     res.end(JSON.stringify(out));
//                 }
//             });
//         }
//     });
//
// });
//
// app.post('/updateaccount', (req, res) => {
//     console.log("Inisde post account update");
//
//     console.log("Req Data : ",req.body);
//
//     var data = req.body;
//
//     var sql1 = "select * from user_mdb where email = " + mysql.escape(data.email) + " and password = " + mysql.escape(data.curpass) ;
//
//     var sql = "update user_mdb set password = "
//     + mysql.escape(data.newpass) + "where email =" + mysql.escape(data.email);
//
//
//     console.log(sql);
//     console.log(sql1);
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql1, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     if(result.length > 0)
//                     {
//                         con.query(sql, function (err, result) {
//                             if (err) {
//                                 res.writeHead(400, {
//                                     'Content-Type': 'text/plain'
//                                 })
//                                 res.end("Unable to get data");
//                                 console.log("Unable get data");
//                                 console.log(err);
//                             } else {
//                                 res.writeHead(200, {
//                                     'Content-Type': 'text/plain'
//                                 })
//                                 res.end("Successful");
//                                 console.log("Successful upadted password");
//                             }
//                     }
//                         )}
//                     else
//                     {
//                         res.writeHead(200, {
//                             'Content-Type': 'text/plain'
//                         })
//                         res.end("UnSuccessful");
//                         console.log("Didnot upadte password");
//                     }
//
//
//                 }
//             });
//         }
//     });
// });
//
//
//
// app.post('/uploadproperty',upload.array('proppics',5), (req, res) => {
//     //console.log("Req : ",req);
//    // console.log("Req File : ",req.files);
//
//    // console.log("Req Data : ",req.body.proppics);
//
//    var data = JSON.parse(req.body.propdata);
//
//     console.log(data.propdesc);
//
//     const sql = 'INSERT INTO `property_list`( `owner_id`,`name`, `type`, `description`, `place`, `capacity`,' +
//         ' `bed`, `bath`, `price`, `from_date`, `to_date`, `booking_options`, `min_stay`) ' +
//         'VALUES (' +
//         mysql.escape(data.userid) + ',' +
//          mysql.escape(data.propname) + ',' +
//          mysql.escape(data.proptype) + ',' +
//          mysql.escape(data.propdesc) + ',' +
//          mysql.escape(data.location) + ',' +
//          mysql.escape(data.capacity) + ',' +
//          mysql.escape(data.bed) + ',' +
//          mysql.escape(data.bath) + ',' +
//          mysql.escape(data.price) + ',' +
//          mysql.escape(data.from) + ',' +
//          mysql.escape(data.to) + ',' +
//          mysql.escape(data.bookingoptions) + ',' +
//          mysql.escape(data.minstay) + ')';
//
//     console.log(sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Unable to create user");
//                     console.log("Unable to create user");
//                     console.log(err);
//                 }else{
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Successfully uploaded Propert");
//                     console.log("Successful uploading")
//                 }
//             });
//         }
//     });
//
//
// });
//
// const storagepic = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log('Request to multer:' + req.body.description);
//         cb(null, './uploads/profile');
//     },
//     filename: (req, file, cb) => {
//
//         const newFilename = `profile_${req.body.description}.jpg`;
//         cb(null, newFilename);
//     },
// });
//
// const uploadpic = multer({ storage : storagepic });
//
// app.post('/uploadpic',uploadpic.single('selectedFile'), (req, res) => {
//     //console.log("Req : ",req);
//     console.log("Req File : ",req.file);
//     console.log("REq Desc: ", req.body.description);
//
//     res.send();
// });
//
// app.post('/getprofilepic/:file(*)',(req, res) => {
//     console.log("Inside get profile pic");
//     var file = req.params.file;
//     var fileLocation = path.join(__dirname + '/uploads/profile',file);
//     var img = fs.readFileSync(fileLocation);
//     var base64img = new Buffer(img).toString('base64');
//     res.writeHead(200, {'Content-Type': 'image/jpg' });
//     res.end(base64img);
// });
//
// app.post('/bookprop',(req,res)=> {
//
//     console.log(req.body);
//
//     const sql = 'INSERT INTO `propert_booking`(`user_id`, ' +
//         '`owner_id`, `property_id`, `booked_from`, `booked_to`) VALUES (' +
//         mysql.escape(req.body.user_id) + ',' +
//         mysql.escape(req.body.owner_id) + ',' +
//         mysql.escape(req.body.propid) + ',' +
//         mysql.escape(req.body.from) + ',' +
//         mysql.escape(req.body.to) +  ')';
//
//     console.log(sql);
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to create user");
//                     console.log("Unable to create user");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Successfully Booked Property");
//                     console.log("Successfully Booked Property")
//                 }
//             });
//         }
//
//     })
// });
//
// app.get('/getownerproperties',function (req,res) {
//     console.log('Inisde GET owner Propertiesaccount');
//     console.log(req.query.id);
//
//     var sql = "select * from property_list where owner_id =" +  req.query.id;
// //    console.log(sql);
//
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     // console.log(result[0]);
//                     var out = {
//                         "ans" : result
//                     }
//                     res.end(JSON.stringify(out));
//                 }
//             });
//         }
//     });
//
// });
//
// app.get('/getuserbookings',function (req,res) {
//     console.log('Inisde GET user bookings');
//     console.log(req.query.id);
//
//     var sql = "SELECT propert_booking.booking_id,user_mdb.username,propert_booking.property_id,property_list.name,property_list.type,propert_booking.booked_from,propert_booking.booked_to,property_list.price\n" +
//         "FROM propert_booking \n" +
//         "INNER JOIN property_list on propert_booking.property_id = property_list.num\n" +
//         "INNER JOIN user_mdb on propert_booking.user_id = user_mdb.user_id\n" +
//         "WHERE propert_booking.user_id =" +  req.query.id;
// //    console.log(sql);
//
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     // console.log(result[0]);
//                     var out = {
//                         "ans" : result
//                     }
//                     res.end(JSON.stringify(out));
//                 }
//             });
//         }
//     });
//
// });
//
// app.get('/getownerbookings',function (req,res) {
//     console.log('Inisde GET owner bookings');
//     console.log(req.query.id);
//
//     var sql = "SELECT propert_booking.booking_id,user_mdb.username,propert_booking.property_id,property_list.name,property_list.type,propert_booking.booked_from,propert_booking.booked_to,property_list.price\n" +
//                 "FROM propert_booking \n" +
//                 "INNER JOIN property_list on propert_booking.property_id = property_list.num\n" +
//                 "INNER JOIN user_mdb on propert_booking.user_id = user_mdb.user_id\n" +
//                 "WHERE propert_booking.owner_id =" +  req.query.id;
// //    console.log(sql);
//
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     // console.log(result[0]);
//                     var out = {
//                         "ans" : result
//                     }
//                     res.end(JSON.stringify(out));
//                 }
//             });
//         }
//     });
//
// });
//
//
// app.get('/getuserbookings',function (req,res) {
//     console.log('Inisde GET user bookings');
//     console.log(req.query.id);
//
//     var sql = "SELECT propert_booking.booking_id,user_mdb.username,propert_booking.property_id,property_list.name,property_list.type,propert_booking.booked_from,propert_booking.booked_to,property_list.price\n" +
//         "FROM propert_booking \n" +
//         "INNER JOIN property_list on propert_booking.property_id = property_list.num\n" +
//         "INNER JOIN user_mdb on propert_booking.user_id = user_mdb.user_id\n" +
//         "WHERE propert_booking.user_id =" +  req.query.id;
// //    console.log(sql);
//
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Unable to get data");
//                     console.log("Unable get data");
//                     console.log(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     // console.log(result[0]);
//                     var out = {
//                         "ans" : result
//                     }
//                     res.end(JSON.stringify(out));
//                 }
//             });
//         }
//     });
//
// });

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3001, function () {
    console.log("Server listening on port 3001");

});





