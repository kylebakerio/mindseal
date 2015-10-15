(function(){
  window.shared = {};
  shared.view = function(ctrl){
    //creates a button for every deck
    var mArray = [];
    for (var deck in ctrl.shared){
      mArray.push(
        //m("a", {href:('#/deckDash/' + deck)}, 
          m("input[type='button']",{value:deck, onclick:m.withAttr("value", ctrl.addDeck)}),
        //),
        m("br"),
        m('p',"number of cards: " + ctrl.shared[deck].cards.length)
      )
    }

    return m("div.container center-block",[
      m('br'),
      m("a[href='#/newDeck']", //m routing to a new deck view
          m("input[type='button']",{value:"New Deck"}) //need to call a function at all?
        ), //m creating a button before rendering deck links
      m('br'),
      m('br'),
      m("h2", "Select a shared deck to add to your own decks:"),
      m("", mArray), 
    ]);
  }

  shared.controller = function(){
    ctrl = this;
    Deck.fetch("shared")
    .then(function(res){
      ctrl.shared = res.decks;
    })

    ctrl.addDeck = function(deckName){
      Deck.createDeck(deckName,ctrl.shared[deckName])
    };
  }
})()
