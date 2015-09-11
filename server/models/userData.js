/* new model for a single collection design */

//A mongo api that makes use of promises
var pmongo = require('promised-mongo');

// Connection URL
var url = 'mongodb://localhost:27017/test'; 

//Defining the specific collection 
var db = pmongo(url, ['decks']);
var collection = db.collection('decks');

//making database model available to the server
var decksMethods = module.exports; 
var testString = "55ee4e4fba73cb4b51a3a264";

decksMethods.createDecks = function (user, name, deck) { //create a deck for a specific user
  var deck =  deck || {}; 

  //adding a new deck to an existing document - update document
  var deck = {1: "one"};
  var name = "deckName";
  // setObject = { $set: { } }
  var setObject = {};
  setObject["$set"] = {};
  setObject["$set"]["decks."+name] = deck; 

  collection.update({_id: user}, setObject);
}

decksMethods.getDecks = function (user) { //get all decks of a user
  return collection.findOne({_id: user}); //return decks with deckname 
}

decksMethods.refreshDecks = function (user, decks) { //replaces the current decks in database completely
  return collection.update({_id: user}, {$set: {decks: decks}}) //returns a success or error
}

