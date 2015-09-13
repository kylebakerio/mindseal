var settings = {};

settings.view = function(){
  //creates a button for every deck
  var mArray = [];
  for (var deck in App.mindSeal().decks){
    mArray.push(
      // m("a", {href:('#/deckDash/' + deck)}, 
        m("h3",deck),
      // ),
      m("br"),
      m("br")
    )
  }

  //these vals need to be set to localStorage to have settings persist.

  return m("div.container center-block",[
    m('br'),
    m("h1", "General Settings:"),
    m("p", "New cards per day:"), //should modify some variable used by
    m("br"),
    m("p", "Initial delay for new cards:"), //should modify default tval
    m("br"),
    m("p", "Difficulty:"), //should modify default cScale
    m("br"),
    m("p", "Use individual-learning algorithm:"), //should enable cScale modifiers (advanced algo)
    m("br"),
    // m("br"),
    // m("h1", "Deck Settings:"),
    m("", mArray)
  ]);
}

settings.controller = function(){

}
