Card = {};

//can be modified in settings page.
console.log(App.mindSeal())
Card.tValDefault =  m.prop(App.mindSeal().userSettings.tValDefault) || m.prop(129599999);
// Card.vm( { front: "front of card", back: "backofCard"  } )

Card.vm = function (card) {
  // ViewModel for creating cards 
  card = card || {};
  console.log(card, "in vm");

  return {  
    front: m.prop(card.front || ''),
    back: m.prop(card.back || ''),
    tVal: m.prop(card.tVal || Card.tValDefault), //this is the difference between the next two values (default value)
    timeLastSeen: m.prop(card.timeLastSeen || moment()),
    toBeSeen: m.prop(card.toBeSeen || moment().add(Card.tValDefault)),
    cMem: m.prop(card.cMem || []),
    cScale: m.prop(card.cScale || {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5})
  }

}

Card.setCard = function (card, deck) {
  deck.cards.unshift(card); //should probably actually sort it here, but this will work for now.
  setMindSeal();
  console.log(deck.cards[0]) 
}

//probably will not implement this by Monday:

// Card.deleteCard = function(index) {
//   // var toRemove = ctrl.contacts().splice(index, 1);
//   // m.request({
//   //   method: 'DELETE',
//   //   url: '/decks/' + options.deck,
//   //   data: toRemove
//   // });
// }

Card.tValSetDefault = function(hours){ //populates the values of the card from the form and calls the view
  console.log("Old tVal: " + Card.tValDefault());
  Card.tValDefault( moment.duration(hours, 'h').asMilliseconds() ); 
  App.mindSeal().userSettings.tValDefault = Card.tValDefault();
  setMindSeal();
  console.log(App.mindSeal().userSettings.tValDefault + ": new default tVal.");
}
