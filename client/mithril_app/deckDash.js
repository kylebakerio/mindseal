var deckDash = {};

deckDash.view = function(ctrl){
  return m("div.container center-block",[
    m('br'),
    m("h1", ctrl.name),
    m('br'),
    m("p.lead","Number of Cards: " + ctrl.deck.cards.length),
    m("p.lead","Date Created: ", m('',moment(ctrl.deck.creation).format("MMM Do, YYYY"))),
    // m('strong',"time studied: "),
    m("a", {href:('#/viewDeck/' + ctrl.name)}, 
        m("input[type='button']",{value:"Review"})
      ),
    m("a", {href:('#/addCards/' + ctrl.name)}, 
      m("input[type='button']",{value:"Add Cards"})
    ),
    m("input[type='button']",{value:"Share this deck", onclick:ctrl.share}),
    // m("a", {href:('#/editDeck/' + deck)}, 
    //   m("input[type='button']",{value:"Edit Deck"})
    // ),
    m("br"),
    m("br")
  ]);
}

deckDash.controller = function(args){
  var ctrl = this;
  ctrl.name = args.name;
  ctrl.deck = args.deck;
  ctrl.share = function(){
    Deck.share(ctrl.deck, ctrl.name);
  }
}
