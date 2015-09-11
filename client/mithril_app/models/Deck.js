Deck = /*Deck ||*/ {};

// App.newDeck = new Deck();

// App.newDeck.addCard(/*new card model*/)

Deck.vm = function(){ //only able to make new decks from scratch
  return {
    order:[],
    addCard: function(){}
  }
}

Deck.fetch = function() { //should be the server call to get a Decks object
  // return m.request({
  //   method: 'GET', 
  //   url: '/decks/',
  //   data: session token
  // })
  return {
    mvp: { //this is a deck's name
      order: ["uniquekey2", "uniquekey3"], //these are card unique ID's
      uniquekey2: {                        // this is a card itselfthis.deck in viewDeck controller: [object Object]
        front: "this is card1's front",
        back: "this is card1's back",
        flag: false //don't remember, needs to be seen
      },
      uniquekey3: {
        front: "this is card2's front",
        back: "this is card2's back",
        flag: false //don't remember, needs to be seen
      }
    },
    demoDeck2: {
      order: ["uniquekey5", "uniquekey6"], //these are card unique ID's
      uniquekey6: {                        // this is a card itself
        front: "this is card5's front",
        back: "this is card5's back",
        flag: false //don't remember, needs to be seen
      },
      uniquekey5: {
        front: "this is card6's front",
        back: "this is card6's back",
        flag: false //don't remember, needs to be seen
      }
    }
  } 
}


Deck.find = function (id) { //
  // Get deck matching id
  //defined for demo purposes, normally this should be the stuff gotten from a server call.
  console.log("looking for App.Decks[" + id + "], which is:")
  // console.log(App.Decks())
  if(App.Decks()[id] === undefined) {alert("Deck.find failed!" )}
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

// {
//   deck1: {
//     order:["card1","card3"],
//     card1: {}

//   }

//   deck2:{}
// }
