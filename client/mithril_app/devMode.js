//this is suboptimal, but is a bugfix to break up a circular file dependency:

Card = {};
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

// this document specifies a devmode, where two decks 
// with two cards are automatically stored.

// !!WARNING!! If you have real deck data on your machine, devMode will
// erase that data with this demo data! Use at your own risk!

if( 
    devMode === true && 
    !localStorage.getObject('mindSeal').decks &&
    (prompt("WARNING! devMode is on, and it appears there are no decks. \
      Overwrite ALL LOCAL DATA with dummy data? Type 'yes' to continue.") === "yes")
  ) {

  console.log("there are no decks, devmode is on, user approved; adding dummy decks.")
  
  var devData = { 
    userSettings: {
      tValDefault: 128000000
    },
    decks: { 
      programming: { cards : [] },
      trivia: { cards : [] }
    } 
  }

  devData.decks.programming.cards.push(Card.vm({
    front: "How does one add objects to local storage?",
    back: "JSON.stringify."
  }))
  devData.decks.programming.cards.push(Card.vm({
    front: "Who is the coolest?",
    back: "Clearly, Nathan."
  }))
  devData.decks.trivia.cards.push(Card.vm({
    front: "Do you really need a second deck?",
    back: "of course you do."
  }))
  devData.decks.trivia.cards.push(Card.vm({
    front: "Is Jeff's beard epic?",
    back: "You don't need a flashcard to know that."
  }))

  localStorage.setObject('mindSeal', devData)

}

else if ( devMode === true && localStorage.getObject('mindSeal').decks ) {
  console.log("devMode is on, but there is already a decks object. Nothing will be changed.\
  if you want to write dummy decks anyways, and ERASE ALL mindSeal data!!! \
  type the following into the console:\
  localStorage.setObject('mindSeal', {})\
  and then refresh the page.")
}
