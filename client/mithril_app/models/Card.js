Card = {};

//can be modified in settings page.
Card.tValDefault = 129600000;

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
  localStorage.setObject('mindSeal', App.mindSeal)
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
