(function(){
  window.addCards = {};

  addCards.view = function(ctrl){
    return m('br'),
      m(".container", [
      m('br'),
      m("a", {href:('#/deckDash/' + ctrl.name)}, 
        m("input[type='button']",{value:("Back to " + ctrl.name + "'s dashboard")})
      ),
      m(".starter-template", [
        m('.center-block', [
          m("h1", "mind:seal"),
          m("p.lead", ["Let's make some cards.",
            m("br")," So you can remember stuff."]),
          m('p','Size of your deck: ' + ctrl.deck.cards.length),
          m("input[type='text'][class='newFront']", {value:ctrl.frontTxt(), onchange: m.withAttr("value", ctrl.frontTxt)}), //m
          m("br"),
          m("input[type='text'][class='newBack']", {value:ctrl.backTxt(), onchange: m.withAttr("value", ctrl.backTxt)}),
          m("br"),
          m("input[type='button'][value='make a card!']",
            {onclick:ctrl.makeCard}
            )
        ])
      ])
    ])
  }

  addCards.controller = function(args){
    var ctrl = this;
    ctrl.name = args.name;
    ctrl.deck = args.deck;
    ctrl.clear = "";
    ctrl.frontTxt = m.prop("");
    ctrl.backTxt = m.prop("");

    ctrl.makeCard = function(){ //populates the values of the card from the form and calls the view
      var newCard = {}
      newCard.front = ctrl.frontTxt();
      newCard.back = ctrl.backTxt();
      console.log("making card: " + newCard.front);

      //m add algo fields (default values) in here? 
      console.log("ctrl.deck is: ");
      console.log(ctrl.deck);
      console.log("vm'd: ");
      console.log(Card.vm(newCard))
      Deck.binaryInsert(null, ctrl.deck.cards, "toBeSeen", Card.vm(newCard));

      // Card.setCard(Card.vm(newCard),ctrl.deck);

      ctrl.frontTxt("");
      ctrl.backTxt("");
    }
  }
})()
