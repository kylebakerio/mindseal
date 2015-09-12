Card = Card || {};


Card.vm({ front: "front of card", back: "backofCard"  })

Card.vm = function (card) {
  // ViewModel for creating cards 
  card = card || {};

  return {  
    front: m.prop(card.front || ''),
    back: m.prop(card.back || ''),
    tVal: m.prop(card.tVal || ''), //this is the difference between the next two values
    toBeSeen: m.prop(card.toBeSeen || ''),
    timeLastSeen: m.prop(card.timeLastSeen || moment()),
    cMem: m.prop(card.cMem || []),
    cScale: m.prop(card.cScale || {})    
  }
}

// var newCard = new Card.vm({front: '1'})

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
