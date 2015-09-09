var addCards = {};

addCards.view = function(){
  return m(".container", [
      m(".starter-template", [
        m("h1", "CODENAME: IGGY"),
        m("p.lead", ["Let's make some cards.",m("br")," So you can remember stuff."]),
        m("input[type='text']"),
        m("br"),
        m("input[type='text']"),
        m("br"),
        m("input[type='button'][value='make a card!']")
      ])
    ])
}

addCards.controller = function(){
  
}
