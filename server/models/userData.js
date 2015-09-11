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

/*
  data structure

                        { _id: "uniqueUserGoogleId", 
                          name: "userName", 
                          decks: { 
                            deck1: {
                              name: "deckName",
                              cards: [{ 
                                _id: "autoincr1",
                                front: "this is the title card",
                                back: "this is the solution card",
                                flag: 0
                              },
                              { _id: "autoincr2",
                              front: "front of the second card",
                              back: "back of the second card",
                              flag: 0
                              }]
                            },
                            deck2: {
                            }
                          }
                        }

*/

// decksMethods.find = function (id) { //internal function

// }

decksMethods.createDecks = function (user, name, deck) { 
  var deck =  deck || {};
  //create a deck for a specific user
  //TODO: autoincrement deck keys or create here, depending on how many exist in collection right now

  //if decks were an array of decks then I would iterate over it to pick out the 
  //decks and add to an object before sending to server- but this won't be promisified
  //So the original one should have the keys as name of the decks.

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

