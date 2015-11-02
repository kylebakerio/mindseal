window.Card = {};

//can be modified in settings page.
// console.log("App.mindSeal: ", App.mindSeal);



Card.vm = function (card) {
// ViewModel for creating cards 
// usage example: Card.vm( { front: "front of card", back: "backofCard"  } )
  card = card || {};

  return {  
    front: card.front || '',
    back: card.back || '',
    tVal: card.tVal || App.mindSeal.userSettings.tValDefault, //this should be removed in the future, should always be derived
    timeLastSeen: card.timeLastSeen || moment().format(),
    toBeSeen: card.toBeSeen || moment().add(App.mindSeal.userSettings.tValDefault).format(),
    cMem: card.cMem || [],
    cScale: card.cScale || App.mindSeal.userSettings.cScaleDefault || {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5}
  }
}

//defunct, use Deck.binaryInsert
// Card.setCard = function (card, deck) {
//   deck.cards.unshift(card); //should probably actually sort it here, but this will work for now.
//   setMindSeal();
//   console.log(deck.cards[0]) 
// }

//probably will not implement this by Monday:

// Card.deleteCard = function(index) {
//   // var toRemove = ctrl.contacts().splice(index, 1);
//   // m.request({
//   //   method: 'DELETE',
//   //   url: '/decks/' + options.deck,
//   //   data: toRemove
//   // });
// }

Card.tValSetDefault = function(hours){ 
  console.log("old tval: " + moment.duration(App.mindSeal.userSettings.tValDefault, 'milliseconds').asDays() + " days");
  App.mindSeal.userSettings.tValDefault = moment.duration(hours, 'h').asMilliseconds() ; 
  setMindSeal();
  console.log("new default tval: " + moment.duration(App.mindSeal.userSettings.tValDefault, 'milliseconds').asDays() + " days");
}

Card.counter = function(){
  console.log("counting...")
  if (moment(App.mindSeal.userSettings.lastEdit).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY')) {
    console.log("it's the same day")
    App.mindSeal.userSettings.todayCounter++;
  }
  else {
    console.log("it's a new day")
    App.mindSeal.userSettings.todayCounter = 1;
  }
  App.mindSeal.userSettings.allTimeCounter++;
}
