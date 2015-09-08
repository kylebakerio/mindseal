var viewDeck = {};

viewDeck.view = function(){

  // document.getElementById("see-decks").addClass("active")
  
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
  var ctrl = this
  ctrl.contacts = m.prop( [new Contacts.model()] )

  ctrl.add = function () {
    var newModel = new Contacts.model()
    ctrl.contacts().push(newModel)
  }

  ctrl.remove = function (idx) {
    ctrl.contacts().splice(idx, 1)
  }
}
