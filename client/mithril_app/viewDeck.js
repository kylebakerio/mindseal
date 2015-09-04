var viewDeck = {};

viewDeck.view = function(){
  return m(".container",[
      m(".starter-template", [
        m("h1", "Let's look at cards!!!"),
        m("p.lead", ["wheeeeeee......!!!111!1!!!1337",m("br")," nullundefined."]),
        m(".center-block", [
          m(".card.front.center-block", "card front"),
          m(".card.back.center-block", "card back"),
          m("input[type='button'][value='I remembered!']"),
          m("input[type='button'][value='I did not remember']")
        ])
      ])
    ])
}

viewDeck.controller = function(){
  
}