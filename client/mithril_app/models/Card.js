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

Card.setCard = function (card) {
  //should be a server call or local storage call
  viewDeck.currentDeck.cards.unshift(card);
  console.log(viewDeck.currentDeck.cards[0]);
}

  // remove = function(index) {
  //   var toRemove = ctrl.contacts().splice(index, 1);
  //   m.request({
  //     method: 'DELETE',
  //     url: '/decks/' + options.deck,
  //     data: toRemove
  //   });
  // }

/* var Posts =
exports = {
  model: function () {
    this.id = m.prop('');
    this.title = m.prop('');
    this.content = m.prop('');
    this.summary = m.prop('');
    this.author = m.prop('');
  }
} */
