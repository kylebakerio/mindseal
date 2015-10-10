//create a new deck here
(function(){
  window.newDeck = {};
  newDeck.view = function(ctrl){
    return m(".container", [
      m(".starter-template", [
        m("h1", "mind:seal"),
        m('div', {class: "deck-container"} ),
        m('.center-block', [
          m("p.lead", "Let's add a new deck.",
            m('br'),
            m("input[type='text'][class='newDeckName']", {onchange: m.withAttr("value", ctrl.nameTxt)}),
            m("br"),
            m('a',{href:"#/deckDash/" + ctrl.nameTxt()}, 
              m("input[type='button'][value='Make it!']",{onclick:ctrl.makeDeck} )
            )
          )
        ])
      ])
    ])
  };

  newDeck.controller = function(args){
    var ctrl = this;
    ctrl = this;
    ctrl.nameTxt = m.prop();
    console.log(args.name);
    ctrl.makeDeck = function(){ //populates the values of the card from the form and calls the view
      var deck = {name:ctrl.nameTxt()};
      console.log(deck.name + ": name of the deck fetched from the dom");
      Deck.createDeck(deck.name);
    };
  };
})()
