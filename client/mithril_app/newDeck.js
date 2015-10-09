//create a new deck here
(function(){

  window.newDeck = {};

  newDeck.nameTxt = m.prop();

  newDeck.view = function(){
    return m(".container", [
      m(".starter-template", [
        m("h1", "mind:seal"),
        m('div', {class: "deck-container"} ),
        m('.center-block', [
          m("p.lead", "Let's add a new deck.",
            m('br'),
            m("input[type='text'][class='newDeckName']", {onchange: m.withAttr("value", newDeck.nameTxt)}),
            m("br"),
            m('a',{href:"#/deckDash/" + newDeck.nameTxt()}, 
              m("input[type='button'][value='Make it!']",{onclick:this.makeDeck.bind(this)} )
            )
          )
        ])
      ])
    ])
  }

  newDeck.makeDeck = function(){ //populates the values of the card from the form and calls the view
    var deck = {};

    deck.name = this.nameTxt();

    console.log(deck.name + ": name of the deck fetched from the dom");

    Deck.createDeck(deck.name);
    //redirect to the dashboard for the deck

    //server call to create a deck? low priority
  }

  newDeck.controller = function(args){
    var ctrl = this;
    console.log(args.name);

    //ctrl.update to make server request later
  }

})()
