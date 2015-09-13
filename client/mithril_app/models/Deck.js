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
  return { 
    mvp: { //this is a deck's name
      cards: [ //these are card unique ID's
        {                        // this is a card itself
          front: "this is card1's front",
          back: "this is card1's back",
          tVal: 129600000, //this is the difference between the next two values
          toBeSeen: moment(),
          timeLastSeen: moment().subtract(36,'h'),
          cMem:[],
          cScale:{}      
        },
        {
          front: "this is card2's front",
          back: "this is card2's back",
          tVal: 129600000, //this is the difference between the next two values
          toBeSeen: moment(),
          timeLastSeen: moment().subtract(36,'h'),
          cMem:[],
          cScale:{}      
        }
      ]
    },
    demoDeck2: { 
      cards: [ 
        { 
          front: "this is card5's front",
          back: "this is card5's back",
          tVal: 129600000, 
          toBeSeen: moment(),
          timeLastSeen: moment().subtract(36,'h'),
          cMem:[],
          cScale:{}      
        },
        { 
          front: "this is card6's front",
          back: "this is card6's back",
          tVal: 129600000, 
          toBeSeen: moment(),
          timeLastSeen: moment().subtract(36,'h'),
          cMem:[],
          cScale:{}      
        }
      ]
    }
  } 
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
