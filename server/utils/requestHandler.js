var Decks = require('../models/deck.js'),
    Auth  = require ('./auth.js');

module.exports = {

  getDecks: function(req, res) {
    // Auth.getId(req).then(function(googleId) {});
    var googleId = "mvp_test";
    Decks.getDecks(googleId)
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
    // Auth.getId(req).then(function(googleId) {});
    var googleId = req.get('googleId');
    var googleId = 'mvp_test';
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
