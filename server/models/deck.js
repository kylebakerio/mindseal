//A mongo api that makes use of promises
var pmongo = require('promised-mongo');

// Connection URL
var url = 'mongodb://localhost:27017/test';

var db = pmongo(url, ['test']);

var Deck = module.exports;


Deck.find = function (id) {
  return db.decks.findOne({ _id: pmongo.ObjectId(id) });
}

Deck.create = function (name, user) { //creates a new empty deck. MVP: pre-create one.
  user = user || 'MvpTester'; //hardcoded user for MVP
  db.decks.insert({ name: name, cards: [] });
}

Deck.addCards = function (id, card) { //add cards (one at a time) to an existing deck.
  id = id || "55edd797ba73cb4b51a3a262" //MVP: single hard coded value, only send the id string
  Deck.find(id)
  .then(function(deck){
    deck.update({ $push: { card: card } });
  })
}

Deck.getCards = function (user) { //calls user.js to get all deck ids for that user MVP: default user
  user = user || 'MvpTester'; //arg undefined for MVP
  allDecks = //single hardcoded value for MVP, send only the id string
  Deck.find(allDecks)
  .then(function(deck){
    return result = deck.cards;
  })
}

Deck.removeCards = function () { //MVP: does nothing
}

//test code
Deck.create('new'); 
