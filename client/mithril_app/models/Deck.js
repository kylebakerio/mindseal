Deck = /*Deck ||*/ {};

// App.newDeck = new Deck();

// App.newDeck.addCard(/*new card model*/)

Deck.vm = function(){ // template for a new deck
  return {
    cards:[],
    addCard: function(){}
  }
}

//maybe refresh with server or fetch from local storage
Deck.fetch = function() { //should be the server call to get a Decks object
  // return m.request({
  //   method: 'GET', 
  //   url: '/decks/'//,
  //   // data: session token
  // })
}

Deck.sync = function() {
  //should check with server to see if remote version 
  //is more recent than local version.
}


Deck.find = function (id) { //
  // Get deck matching id
  console.log("looking for App.Decks[" + id + "], which is:")
  if(App.Decks()[id] === undefined) {
    alert("Deck.find failed, could not find the requested deck: " + id)
  }
  return App.Decks()[id]
}

Deck.createCard = function (deckId, cardProps) {
  // Create a new card in deck matching deckId.
  // cardProps should include at minimum .front and .back properties.

//   m.request({
//     method: 'POST', 
//     url: '/decks/' + deckId + '/cards',
//     data: cardProps
//   })
//   .then(function(addedCard) {
//     ctrl.cards().push(addedCard)
//   })
}
