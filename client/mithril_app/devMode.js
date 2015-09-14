

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
    userSettings: {},
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
