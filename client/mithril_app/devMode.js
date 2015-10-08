//var devMode = true
Card = {};


//this is suboptimal, but is a bugfix to break up a circular file dependency:

Card.vm = function (card) {
// ViewModel for creating cards 
// usage example: Card.vm( { front: "front of card", back: "backofCard"  } )
  card = card || {};
  console.log(card.front, " is passing through devmode Card.vm")

  return {  
    front: card.front || '',
    back: card.back || '',
    //should refactor to remove tval; it can always be derived by calculation of the next two, and 
    //should not be relied upon for future calculations--current date is more useful to tell 'real world'
    //tval, instead of 'desired tval' (which is still viewable), though we might want to store card tval
    //over time or something instead
    tVal: card.tVal || Card.tValDefault, //this is the difference between the next two values (default value)
    timeLastSeen: card.timeLastSeen || moment().format(),
    toBeSeen: card.toBeSeen || moment().add(Card.tValDefault).format(),
    cMem: card.cMem || [],
    cScale: card.cScale || {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5}
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
      newCardLimit: 20,
      tValDefault: 128000000, //initial gap between making a card and it being seen for the first time
      lastEdit: moment().format(), // for syncing purposes.
      todayCounter: 0,
      allTimeCounter: 197
    },
    decks: { 
      programming: { cards: [], creation: moment().subtract(90, 'days').format('MM-DD-YYYY') },
      trivia: { cards: [], creation: moment().subtract(11100, 'days').format('MM-DD-YYYY') }
    } 
  }

  devData.decks.programming.cards.push(Card.vm({
    front: "How does one add objects to local storage?",
    back: "JSON.stringify ftw, yo."
  }))
  devData.decks.programming.cards.push(Card.vm({
    front: "Who is the your daddy?",
    back: "Probably Gilbert."
  }))
  devData.decks.trivia.cards.push(Card.vm({
    front: "Do you really need a second deck for this demonstration?",
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
