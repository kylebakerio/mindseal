var viewDeck = {};

viewDeck.view = function(){
  return 
    m(".container", [
      m(".starter-template", [
        m("h1", "Bootstrap starter template"),
        m("p.lead", ["Use this document as a way to quickly start any new project.",m("br")," All you get is this text and a mostly barebones HTML document."]),
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