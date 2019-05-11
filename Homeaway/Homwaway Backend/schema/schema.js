const graphql = require("graphql");
const _ = require("lodash");

var { Users } = require('../model/user');
var { Booking } = require('../model/property_booking');
var { Property } = require('../model/property_list');

var mongoose = require ("../mongoose");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username : { type: GraphQLString },
        password : { type: GraphQLString },
        email : { type: GraphQLString },
        type : { type: GraphQLString },
        created_date  : { type: GraphQLString },
        firstname : { type: GraphQLString },
        lastname : { type: GraphQLString },
        aboutme : { type: GraphQLString },
        address : { type: GraphQLString },
        address2 : { type: GraphQLString },
        country : { type: GraphQLString },
        state : { type: GraphQLString },
        zip : { type: GraphQLString },
        company : { type: GraphQLString },
        gender : { type: GraphQLString },
        school : { type: GraphQLString },
        hometown : { type: GraphQLString },
        languages : { type: GraphQLString }
    })
});

const PropertyType = new GraphQLObjectType({
    name: "Property",
    fields: () => ({
        id: { type: GraphQLID },
        owner_id  : { type: GraphQLString },
        name : { type: GraphQLString },
        type : { type: GraphQLString },
        description : { type: GraphQLString },
        place : { type: GraphQLString },
        capacity : { type: GraphQLString },
        bed : { type: GraphQLString },
        bath : { type: GraphQLString },
        price : { type: GraphQLString },
        from_date : { type: GraphQLString },
        to_date : { type: GraphQLString },
        booking_options : { type: GraphQLString },
        min_stay : { type: GraphQLString }
    })
});

const Bookings = new GraphQLObjectType({
    name: "booking",
    fields: () => ({
        id: { type: GraphQLID },
        user_id : { type: GraphQLString },
        owner_id : { type: GraphQLString },
        property_id : { type:GraphQLString  },
        booked_from : { type: GraphQLString },
        booked_to : { type: GraphQLString },
        booked_on : { type: GraphQLString },
        property : {
            type: PropertyType,
            resolve(parent, args){
                return Property.findById(parent.property_id);
            }}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        search: {
            type: new GraphQLList(PropertyType),
            args: {
                place: { type: GraphQLString },
                from_date: { type: GraphQLString },
                to_date: { type: GraphQLString },
                capacity: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var query = {};
                if (args.place !== "" && args.place) {
                    query["place"] = { $regex: args.place, $options: "i" };
                }
                if (args.from_date !== "" && args.from_date) {
                    query["from_date"] = {
                        $lte: new Date(args.from_date.substring(0, 10))
                    };
                }
                if (args.to_date !== "" && args.to_date) {
                    query["to_date"] = {
                        $gte: new Date(args.to_date.substring(0, 10))
                    };
                }
                if (args.capacity !== "" && args.capacity) {
                    query["capacity"] = {
                        $gte: Number(args.capacity)
                    };
                }
                console.log(query);
                let result = await Property.find(query, (err, res) => {
                    //console.log(err);
                });
                return result;
            }
        },

        searchAll:
            {

                type: new GraphQLList(PropertyType),
                async resolve(parent, args) {
                    let searchAllResult = await Property.find((err, res) => {
                        console.log("Searching All");
                    });
                    return searchAllResult;
                }
            },

        users: {
            type: UserType,
            args : {
                id : {type :GraphQLID }
            },
            async resolve(parent, args) {
                console.log("In Query",args.id);
                user_profile = await Users.findById(args.id).then((res, err) => {
                        //console.log("res", res);
                        //console.log("err",err);
                    return res;
                    });

                console.log("Users :");
                return user_profile;
            }
        },

        bookings: {
            type: new GraphQLList(Bookings),
            args: {
                user_id: { type: GraphQLString },
                owner_id : { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("In Query");
                let booking = await Booking.find({user_id:args.user_id}, (err, res) => {
                    console.log("Error", err);
                    console.log("Trips", res);
                });
                console.log("Trips :", booking);
                return booking;
            }
        },

        singleProperty:{
            type: PropertyType,
            args :{
                id : { type : GraphQLID}
            },
            async resolve(parent,args)
            {
                let singleProperty = await Property.findById(args.id);
                console.log("SingleProperty:",singleProperty)
                return singleProperty;
            }
        },

        properties: {
            type: new GraphQLList(PropertyType),
            args: {
                owner_id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let propertyList = await Property.find(args);
                console.log("Properties:",propertyList)
                return propertyList;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        login: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                type: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(JSON.stringify(args));
                let found_users = await Users.find(args, (err, res) => {
                    console.log("Error :" + err);
                });
                console.log("found_users :", found_users);
                if (!found_users || found_users.length === 0) {
                    throw errorObj({ _error: "User not found" });
                }
                return { username: found_users[0].username };
            }
        },

        updateProfile: {
            type: UserType,
            args:{
                id : {type :GraphQLID },
                firstname : { type: GraphQLString },
                lastname : { type: GraphQLString },
                aboutme : { type: GraphQLString },
                address : { type: GraphQLString },
                address2 : { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("In Profile Update :",JSON.stringify(args));
                let found_users = await Users.findByIdAndUpdate(args.id,
                                {$set:{firstname : args.firstname,
                                    lastname : args.lastname ,
                                    aboutme : args.aboutme,
                                    address : args.address,
                                    address2 : args.address2
                                    }
                                }, {new : true}, (err, res) => {
                            console.log("err : ",err);
                        console.log("res : ",res);

                })

                return found_users;
            }
        },

        bookProperty: {
            type: Bookings,
            args: {
                user_id: { type: GraphQLID },
                property_id: { type: GraphQLID },
                owner_id: { type: GraphQLID },
                from_date: { type: GraphQLString },
                to_date:{  type: GraphQLString  }
            },
            async resolve(parent, args) {
                console.log(JSON.stringify(args));
                const booking = new Booking({
                    user_id: args.user_id,
                    property_id : args.property_id,
                    owner_id:args.owner_id,
                    from_date:args.from_date,
                    to_date:args.to_date
                });
                let newTrip = await Booking.create({
                        user_id: args.user_id,
                        property_id: args.property_id,
                        owner_id: args.owner_id,
                        from_date: args.from_date,
                        to_date: args.to_date
                    }
                );
                console.log("New Booking", newTrip);
                return newTrip;
            }
        }
    }
});

const errorObj = obj => {
    return new Error(JSON.stringify(obj));
};

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});