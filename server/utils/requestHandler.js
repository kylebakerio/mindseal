
module.exports = {

  getCards: function(req, res) {
    Decks.getCards() 
      .then(function(cards) {
        res.send(cards);
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  },

  addCard: function(req, res) {
    var cards = req.body;
    Decks.addCards(cards)
      .then(function() {
        res.send(201)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  },

  removeCards: function(req,res) {
    var cards = req.body;
    Decks.removeCards(cards)
      .then(function() {
        res.send(200);
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      })
  }

};
