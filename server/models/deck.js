//A mongo api that makes use of promises
var pmongo = require('promised-mongo');

// Connection URL
var url = 'mongodb://localhost:27017/test';

var db = pmongo(url, ['decks']);
var collection = db.collection('decks');

var decksMethods = module.exports; // decksMethods change name

var testString = "55ee4e4fba73cb4b51a3a264"; //for hardcoded deck id

decksMethods.find = function (id) {
  return collection.findOne({ _id: pmongo.ObjectId(id) });
          // .then(function(doc) { console.log("in find")}); //since the .then part is happening in calling functions this needs to be removed. tested.
}
//can also be used as a new deck creator + deck content, cards arg is optional

decksMethods.createDeck = function (name, user, cards) { //creates a new empty deck. MVP: pre-create one.
  user = user || 'MvpTester'; //hardcoded user for MVP
  cards = cards || {};
  collection.insert({ name: name, cards: cards });
}

//are we adding/editing cards client side instead and pushing whole deck objects here? Yes. After MVP.
//TO-DO: 
decksMethods.addCards = function (id, card) { //add cards (one at a time) to an existing deck.
  var id = id || testString; //MVP: single hard coded value, only send the id string
  // decksMethods.find(id)
  // .then(function(deck){
  //   // deck.update({ $push: { card: card } });
  //   // fix to add to deck a card object
  //   // deck.update( { $push: { cards: { order: "card3" } }}, { cards: { card3: card } } );
  // })

  //another approach
  collection.findAndModify({
    query: { _id: id },
    update: { $set: { cards: { card3: card } } },
    new: true
  })
  .then(function(deck) {
    console.log(deck, "here");
  });
}

//change name afterMVP- getDecks
decksMethods.getCards = function (user) { //calls user.js to get all deck ids for that user MVP: default user
  user = user || 'MvpTester'; //arg undefined for MVP
  var allDecks = testString; //should be an array of deck ids. single hardcoded value for MVP, send only the id string
  decksMethods.find(allDecks)
  .then(function(deck){ //decks objects
    console.log(deck);
    return deck;
  })
}

decksMethods.removeCards = function () { //MVP: does nothing
}

