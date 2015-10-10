/* single collection database design to hold one-to-many 
non-overlapping information for each user */

//A mongo api that makes use of promises
var pmongo = require('promised-mongo');

// Connection URL
var url = 'mongodb://localhost:27017/mindseal'; 

//Defining the specific collection 
var db = pmongo(url, ['userData']);
var collection = db.collection('userData');

//making database model available to the server
var module.exports = {

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

  //OLD STUFF BELOW, RE-EVALUATE

  createUser: function(userId, userName) {
    console.log(userId, userName, "data as recieved by the model");
    return collection.insert({ _id: userId, name: userName, decks: {} });
  },

  createDecks: function(userId, deckName, deck) { //create a deck for a specific user
    var deckName =  deckName || "noDeckName" + Math.random(); 
    var setObject = {};
    setObject["$set"] = {}; //creating a variable for the set part of the update query
    setObject["$set"]["decks."+deckName] = deck; //creating a variable key to take in the name of the deck

    //why not the above line as this:
    //setObject["$set"]["decks"][deckName] = deck;


    console.log(userId, deckName, deck, " values in the model");
    return userId ? collection.update({_id: userId}, setObject) : collection.update({_id: "uniqueUserGoogleId"}, setObject)
    // return collection.update({_id: userId}, setObject);
  },

  getDecks: function(userId) { //get all decks of a user
    console.log(userId, " : userid as recieved in model");
    return userId ? collection.findOne({_id: userId}) : collection.find() //test code
    // return collection.findOne({_id: userId}); //return decks with deckname 
  },

  refreshDecks: function(userId, decks) { //replaces the current decks in database completely
    return collection.update({_id: userId}, {$set: {decks: decks}}) //returns a success or error
  }

}