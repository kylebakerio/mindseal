/* single collection database design to hold one-to-many 
non-overlapping information for each user */

//A mongo api that makes use of promises
var pmongo = require('promised-mongo');

// Connection URL
var url = 'mongodb://localhost:27017/test'; 

//Defining the specific collection 
var db = pmongo(url, ['decks']);
var collection = db.collection('decks');

//making database model available to the server
var decksMethods = module.exports; 

decksMethods.user = function (userId, userName) {
  return collection.insert({_id: name}, name: userName, decks: {});
}

decksMethods.createDecks = function (userId, deckName, deck) { //create a deck for a specific user
  var deckName =  deck || {}; 
  var setObject = {};
  setObject["$set"] = {}; //creating a variable for the set part of the update query
  setObject["$set"]["decks."+deckName] = deck; //creating a variable key to take in the name of the deck

  return collection.update({_id: userId}, setObject);
}

decksMethods.getDecks = function (userId) { //get all decks of a user
  return collection.findOne({_id: userId}); //return decks with deckname 
}

decksMethods.refreshDecks = function (userId, decks) { //replaces the current decks in database completely
  return collection.update({_id: userId}, {$set: {decks: decks}}) //returns a success or error
}

