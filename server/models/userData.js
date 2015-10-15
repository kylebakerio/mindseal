/* single collection database design to hold one-to-many 
non-overlapping information for each user */

//A mongo api that makes use of promises
var pmongo     = require('promised-mongo');

// Connection URL
var url        = 'mongodb://localhost:27017/mindseal'; 

// Defining the specific collection 
// trying to replace line 12 with 13
// var db = pmongo(url, ['userData']);
var db         = pmongo(url);
var collection = db.collection('userData');

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

  userFind: function(username){
    console.log("trying to find " + username + " in database")
    return collection.findOne({_id: username});
  },

  createUser: function(username, hashword) {
    console.log(username, hashword, "data as recieved by the model");
    return collection.insert({ _id: username, hashword: hashword, decks: {} });
  },

  // setMindSeal: function(username, decks, userSettings) { //replaces the current decks in database completely
  //   return collection.update({_id: username}, {$set: {decks: decks}}) //returns a success or error
  // },
  
  //OLD STUFF BELOW, RE-EVALUATE


  createDecks: function(username, deckName, deck) { //create a deck for a specific user
    var setObject = {};
    setObject["$set"] = {}; //creating a variable for the set part of the update query
    setObject["$set"]["decks."+deckName] = deck; //creating a variable key to take in the name of the deck

    //why not the above line as this:
    // setObject["$set"]["decks"][deckName] = deck;

    console.log(username, deckName, deck, " values in the model");
    return collection.update({_id: username}, setObject) /* collection.update({_id: "uniqueUserGoogleId"}, setObject)*/
    // return collection.update({_id: username}, setObject);
  },

  getDecks: function(username) { //get all decks of a user
    console.log(username, " : username as recieved in model");
    return username ? collection.findOne({_id: username}) : collection.find() //test code
    // return collection.findOne({_id: username}); //return decks with deckname 
  },

  refreshDecks: function(username, decks) { //replaces the current decks in database completely
    return collection.update({_id: username}, {$set: {decks: decks}}) //returns a success or error
  },

  setSettings: function(username, settings) { //overwrites settings with new settings.
    console.log("settings to add:", settings);
    return collection.update({_id: username}, {$set: {userSettings: settings}}) //returns a success or error
  }
}
