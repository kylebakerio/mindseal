Decks = require('../models/deck.js');

module.exports = {

  getDecks: function(req, res) {
    // var google_id = req.get('api_token') // Once google auth is ready
    var google_id = "mvp_test";
    Decks.getDecks(google_id)
      .then(function(decks) {
        res.send(decks);
      })
      .catch(function(err) {
        console.log(err, "handler");
        res.send(500, err);
      });
  },

  addCard: function(req, res) {
    var cards = req.body;
    var deck_id = req.get('deck_id');
    Decks.addCards(deck_id, cards)
      .then(function(card_ids) {
        res.send(201, card_ids)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  },

  createDeck: function(req, res) {
    // var google_id = req.get('google_id');
    var google_id = 'mvp_test';
    var deckName = req.body.deckName;
    Decks.createDeck(google_id, deckName, req.body.cards)
      .then(function(deck_id) {
        res.send(201, deck_id)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  }
  // removeCards: function(req,res) {
  //   var cards = req.body;
  //   Decks.removeCards(cards)
  //     .then(function() {
  //       res.send(200);
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //       res.send(500, err);
  //     })
  // }

};
