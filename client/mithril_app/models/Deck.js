Deck = /*Deck ||*/ {};

// App.newDeck = new Deck();

// App.newDeck.addCard(/*new card model*/)

//add deck function for synching with local object and local storage

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
  //a get request to the server (db). get back the data, if more recent than local
  //keep else post to refresh database.

  /* init function:
    get from server and setObject if remote more recent

    post client use
    get
    compare timestamps
    setObject if remote more recent
    post request to the db 
  */


}


Deck.find = function (id) { //
  // Get deck matching id
  console.log("looking for App.Decks[" + id + "], which is:")
  if(App.mindSeal().decks[id] === undefined) {
    alert("Deck.find failed, could not find the requested deck: " + id)
  }
  return App.mindSeal().decks[id]
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


Deck.createDeck = function (name) {
  console.log("the deck name as passed to the Deck.js is: ", name)
  //create an empty deck object

}

// ctrl.getDecks = function(username){ //this gets called by home.js
//     m.request({ 
//       method: 'GET',
//       url: '/decks',
//       data: username //?? credentials system?
//     })
//     .then(function(arrayOfDecks){
//       arrayOfDecks.forEach(function(deck,index){
//         App.decks.push(deck) //is this right?
//       })
//     })
//   }