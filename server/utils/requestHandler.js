var database = require('../models/userData.js'),
    Auth  = require ('./auth.js');

/* Note for Nathan:
I changed the require variable name to make the its use a bit clearer.
Updated existing methods.
To Do: add two new methods: createUser and refreshDecks (this replaces the method addCards)
details in xls */

module.exports = {

  getDecks: function(req, res) {
    var googleId = "mvp_test";
    database.getDecks(googleId)
      .then(function(decks) {
        res.send(decks);
      })
      .catch(function(err) {
        console.log(err, "handler");
        res.send(500, err);
      });
  },

  // getDecks: function(req, res) {
  //   // With Auth:
  //   Auth.getId(req)
  //     .catch(function(err) {
  //       // Handler for unsuccessful auth with Google
  //       res.send(401, err);
  //     })
  //     .then(function(googleId) {
  //       return Decks.getDecks(googleId)
  //     })
  //     .then(function(decks) {
  //       res.send(cards);
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //       res.send(500, err);
  //     });
  // },

  addCard: function(req, res) {
    var cards = req.body;
    var deckId = req.get('deck_id');
    Decks.addCards(deckId, cards)
      .then(function(cardIds) {
        res.send(201, cardIds)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  },

  createDecks: function(req, res) {
    var googleId = req.get('googleId');
    var googleId = 'mvp_test';
    var deckName = req.body.deckName;
    database.createDeck(google_id, deckName, req.body.cards)
      .then(function(deck_id) {
        res.send(201, deck_id)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  }

  // createDeck: function(req, res) {
  //   // With Auth:
  //   var deckName = req.body.deckName;

  //   Auth.getId(req)
  //     .catch(function(err) {
  //       // Handler for unsuccessful auth with Google
  //       res.send(401, err);
  //     })
  //     .then(function(googleId) {
  //       return Decks.createDeck(googleId, deckName, req.body);
  //     })
  //     .then(function(deckId) {
  //       res.send(201, deckId)
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //       res.send(500, err);
  //     });
  // }

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
