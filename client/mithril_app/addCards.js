(function(){
  window.addCards = {};

  //picks up the text from the input field it's called from

  addCards.view = function(ctrl){
    console.log("run 2")
    return m('br'),
      m(".container", [
      m('br'),
      m("a", {href:('#/deckDash/' + addCards.name)}, 
        m("input[type='button']",{value:("Back to " + addCards.name + "'s dashboard")})
      ),
      m(".starter-template", [
        m('.center-block', [
          m("h1", "mind:seal"),
          m("p.lead", ["Let's make some cards.",
            m("br")," So you can remember stuff."]),
          m('p','Size of your deck: ' + addCards.deck.cards.length),
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
    addCards.name = args.name;
    addCards.deck = args.deck;
    ctrl.clear = "";

    ctrl.frontTxt = m.prop("");
    ctrl.backTxt = m.prop("");

    ctrl.makeCard = function(){ //populates the values of the card from the form and calls the view
      var newCard = {}
      newCard.front = ctrl.frontTxt();
      newCard.back = ctrl.backTxt();
      console.log(newCard.front, " :text value fetched from dom");
      console.log(newCard.back, " :back text value fetched from dom");

      //m add algo fields (default values) in here? 
      console.log(addCards.name)
      Card.setCard(Card.vm(newCard),addCards.deck);
      ctrl.frontTxt("");
      ctrl.backTxt("");
      console.log("run 1")
    }
  }
})()
