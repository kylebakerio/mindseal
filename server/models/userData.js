/* single collection database design to hold one-to-many 
non-overlapping information for each user */

//A mongo api that makes use of promises
// var pmongo     = require('promised-mongo');

// Connection URL
// remote db username/password: finetype/sff2389du2#$@#$
// remote db URL: mongodb://finetype:sff2389du2#$@#$@ds045644.mongolab.com:45644/mindseal
// var url        = process.env.mongoURL || 'mongodb://localhost:27017/mindseal'; 
// console.log("process.env.mongoURL", process.env.mongoURL);

// Defining the specific collection 
// trying to replace line 12 with 13
// var db = pmongo(url, ['userData']);

var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var connection = require('./mongolabCredentials.js')['connectionString']
var collection;

// Connection URL
var url = connection
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to mongodb server");

  collection = db.collection('userData');

  // db.close();
});


//making database model available to the server
module.exports = {
  getShared: function(){
    console.log("attempting to grab shared decks.");
    return collection.findOne({_id: "shared"});
  },

  shareDeck: function(deckName, deck){
    console.log("attempting to share deck: " + deckName);
    setObject = {"$set":{}};
    setObject["$set"]["decks."+deckName] = deck;
    return collection.update({_id: "shared"}, setObject)
  },

  // userFind: function(username){
  //   return new Promise(function(resolve, reject){
  //     MongoClient.connect(url, function(err, db) {
  //       console.log("gives true?", assert.equal(null, err));
  //       console.log("Connected correctly to mongodb server in userfind");
  //       var collection = db.collection('userData');

  //       resolve( collection.findOne({_id: username}) );
  //     })
  //   })
  // },

  // userFind: function(username){
  //   console.log("trying to find " + username + " in database")
  //   return collection.findOne({_id: username});
  // },

  userFind : function(username){
    console.log("trying to find " + username + " in database");
    return collection.findOne({_id: username});
  },

  createUser: function(username, hashword) {
    console.log(username, hashword, "data as recieved by the model");
    return collection.insert({ _id: username, hashword: hashword, decks: {} });
  },

  refreshDecks: function(username, decks) { //replaces the current decks in database completely
    return collection.update({_id: username}, {$set: {decks: decks}}) //returns a success or error
  },

  setSettings: function(username, settings) { //overwrites settings with new settings.
    console.log("settings to add:", settings);
    if (Object.keys(settings).length === 0) console.log("empty settings object, not updating.")
    return collection.update({_id: username}, {$set: {userSettings: settings}}) //returns a success or error
  },

  // setMindSeal: function(username, decks, userSettings) { //replaces the current decks in database completely
  //   return collection.update({_id: username}, {$set: {decks: decks}}) //returns a success or error
  // },
  
  //OLD STUFF BELOW, RE-EVALUATE


  createDeck: function(username, deckName, deck) { //create a deck for a specific user
    var setObject = {};
    setObject["$set"] = {}; //creating a variable for the set part of the update query
    setObject["$set"]["decks."+deckName] = deck; //creating a variable key to take in the name of the deck

    console.log("adding deck: ", username, deckName, deck);
    return collection.update({_id: username}, setObject) /* collection.update({_id: "uniqueUserGoogleId"}, setObject)*/
  },

  getDecks: function(username) { //get all decks of a user
    console.log(username, " : username as recieved in model");
    return username ? collection.findOne({_id: username}) : collection.find() // Do not leave in for production
  }
}
