Deck = Deck || {};

Deck.find = function (id) {
  return m.request({
    method: 'GET', 
    url: '/decks/' + id
  })
}

Deck.createCard = function (deckId, cardProps) {
  m.request({
    method: 'POST', 
    url: '/decks/' + deckId + '/cards',
    data: cardProps
  })
  .then(function(addedCard) {
    ctrl.cards().push(addedCard)
  })
}
