//var devMode = true
window.Card = {};


//this is suboptimal, but is a bugfix to break up a circular file dependency:
//make sure this is up to date with the latest version in the model!
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
console.log("heads up, you should look at the devMode.js Card.vm function \
  and confirm that it is identical to the version in the models, or rewrite it. :)")

if( 
    devMode === true && 
    localStorage.getObject('mindSeal').dev === true &&
    (prompt("WARNING! devMode is on. \
      Overwrite ALL LOCAL DATA with dummy data? Type 'yes' to continue.") === "yes")
  ) {

  console.log("there are no decks, devmode is on, user approved; adding dummy decks.")
  localStorage.loggedIn = false;
  var devData = { 
    userSettings: {
      newCardLimit: 20,
      tValDefault: 128000000, 
      lastEdit: moment().format(), 
      todayCounter: 0,
      allTimeCounter: 197
    },
    decks: { 
      programming: { cards: [], creation: moment().subtract(90, 'days').format() },
      trivia: { cards: [], creation: moment().subtract(1100, 'days').format() }
    } 
  }

  devData.decks.programming.cards.push(Card.vm({
    front: "How does one add objects to local storage?",
    back: "JSON.stringify ftw, yo.",
    toBeSeen:moment('2014-10-01T20:05:41-05:00').format(),
    timeLastSeen:moment('2013-10-01T20:05:41-05:00').format()
  }))
  devData.decks.programming.cards.push(Card.vm({
    front: "Who is the your daddy?",
    back: "Probably Gilbert.",
    toBeSeen:moment('2014-10-01T20:05:41-05:00').format(),
    timeLastSeen:moment('2013-10-01T20:05:41-05:00').format()
  }))

  devData.decks.trivia.cards.push(Card.vm({
    front: "Do you really need a second deck for this demonstration?",
    back: "of course you do.",
    toBeSeen:moment('2013-10-01T20:05:41-05:00').format(),
    timeLastSeen:moment('2012-10-01T20:05:41-05:00').format()
  }))
  devData.decks.trivia.cards.push(Card.vm({
    front: "Is Taylor's beard epic1?",
    back: "You don't need a flashcard to know that.",
    toBeSeen:moment('2013-10-01T20:05:41-05:00').format(),
    timeLastSeen:moment('2012-10-01T20:05:41-05:00').format()
  }))
  devData.decks.trivia.cards.push(Card.vm({
    front: "Is Taylor's beard epic2?",
    back: "You don't need a flashcard to know that.",
    toBeSeen:moment('2014-09-01T20:05:41-05:00').format(),
    timeLastSeen:moment('2013-10-01T20:05:41-05:00').format()
  }))
  devData.decks.trivia.cards.push(Card.vm({
    front: "Is Taylor's beard epic3?",
    back: "You don't need a flashcard to know that.",
    toBeSeen:moment('2016-10-10T20:05:41-05:00').format(),
    timeLastSeen:moment('2013-10-01T20:05:41-05:00').format()
  }))

  localStorage.setObject('mindSeal', devData)

}

else if ( devMode === true ) {
  console.log("devMode is on, but you have decks. Nothing will be changed.\
  if you want to write dummy decks anyways, and ERASE ALL LOCAL mind:seal data!!! \
  type the following into the console:\
  localStorage.setObject('mindSeal', {dev: true, decks:{},userSettings:{tValDefault:130000000,allTimeCounter:0,todayCounter:0}}) \
  and then refresh the page.")
}
