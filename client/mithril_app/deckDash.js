var deckDash = {};

deckDash.view = function(){

  return m("div.container center-block",[
    m('br'),
    m("h1", deckDash.deck),
    m("a", {href:('#/viewDeck/' + deckDash.deck)}, 
        m("input[type='button']",{value:"Review"})
      ),
      m("a", {href:('#/addCards/' + deckDash.deck)}, 
        m("input[type='button']",{value:"Add Cards"})
      ),
      // m("a", {href:('#/editDeck/' + deck)}, 
      //   m("input[type='button']",{value:"Edit Deck"})
      // ),
      m("br"),
      m("br")
  ]);
}

deckDash.controller = function(args){
  deckDash.deck = args.name
}
