Deck = Deck || {};

Deck.find = function (id) {
  // Get all cards in deck matching id
  return m.request({
    method: 'GET', 
    url: '/decks/' + id
  })
}

Deck.createCard = function (deckId, cardProps) {
  // Create a new card in deck matching deckId.
  // cardProps should include at minimum .front and .back properties.

    // should not push every card... deck should be modified, and then pushed all together.
//   m.request({
//     method: 'POST', 
//     url: '/decks/' + deckId + '/cards',
//     data: cardProps
//   })
//   .then(function(addedCard) {
//     ctrl.cards().push(addedCard)
//   })
}

// {
//   deck1: {
//     order:["card1","card3"],
//     card1: {}

//   }

//   deck2:{}
// }