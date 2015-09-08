var addCards = {};

addCards.view = function(){
  return m(".container", [
      m(".starter-template", [
        m("h1", "CODENAME: IGGY"),
        m("p.lead", ["Let's make some cards.",m("br")," So you can remember stuff."]),
        m("input[type='text'][class='newFront']"),
        m("br"),
        m("input[type='text'][class='newBack']"),
        m("br"),
        m("input[type='button'][value='make a card!']"),
        m("br"),
        m("input[type='button'][value='submit deck!']")
      ])
    ])
}

addCards.controller = function(){
  var ctrl = this;

  //ctrl.currentDeck = m.prop( /*model of new deck*/ ); //if new card in new deck
  //otherwise...

  var ID = m.route.param('deckID');
  ctrl.currentDeck = App.userDecks()[ID];

  ctrl.makeCard = function(){
    //instatiate new Card model.
    // push to proper spots in ctrl.currentDeck

  }

  ctrl.submitDeck = function(){
    // make POST to save deck into DB.
    // update App.userDecks too
  }
}

