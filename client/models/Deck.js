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
  m.request({
    method: 'POST', 
    url: '/decks/' + deckId + '/cards',
    data: cardProps
  })
  .then(function(addedCard) {
    ctrl.cards().push(addedCard)
  })
}
