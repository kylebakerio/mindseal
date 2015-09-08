//A mongo api that makes use of promises
var pmongo = require('promised-mongo');

// Connection URL
var url = 'mongodb://localhost:27017/test';

var db = pmongo(url, ['decks']);
var collection = db.collection('decks');

var decksMethods = module.exports; // decksMethods change name

decksMethods.find = function (id) {
  return collection.findOne({ _id: pmongo.ObjectId(id) })
          .then(function(doc) { console.log(doc, "i"); });
          }

decksMethods.create = function (name, user) { //creates a new empty deck. MVP: pre-create one.
  user = user || 'MvpTester'; //hardcoded user for MVP
  collection.insert({ name: name, cards: {} });
}

decksMethods.addCards = function (id, card) { //add cards (one at a time) to an existing deck.
  id = id || "55ee4e4fba73cb4b51a3a264" //MVP: single hard coded value, only send the id string
  decksMethods.find(id)
  .then(function(deck){
    // deck.update({ $push: { card: card } });
    deck.update( { $push: { cards: {order: "card3" } }}, { cards: { card3: card } } );
  })
}

decksMethods.getCards = function (user) { //calls user.js to get all deck ids for that user MVP: default user
  user = user || 'MvpTester'; //arg undefined for MVP
  allDecks = "55edd797ba73cb4b51a3a262" //should be an array of deck ids. single hardcoded value for MVP, send only the id string
  decksMethods.find(allDecks)
  .then(function(deck){ //decks objects
    return deck; //array of deck
  })
}

decksMethods.removeCards = function () { //MVP: does nothing
}

