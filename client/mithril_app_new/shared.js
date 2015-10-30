(function(){
  window.shared = {};
  shared.view = function(ctrl){
    //refactor to look like gilbert's code in home
    var mArray = [];
    for (var deck in ctrl.shared){
      mArray.push(
        //m("a", {href:('#/deckDash/' + deck)}, 
        m(".row", [
          m(".col.s12.m7.l7.offset-l3.offset-m2", [
            m(".card.blue-grey.darken-1", [
              m(".card-content.white-text", [
                m("span.card-title", deck),
                m("p", "Size of deck: "+ ctrl.shared[deck].cards.length), 
                m("br"),
                ctrl.shared[deck].description ?
                  m("",[m("p", "Description: "+ ctrl.shared[deck].description), 
                  m("br")])
                :
                  m("p", "No description given.")
              ]),
              m(".card-action", [
                m("a.waves-effect.waves-light.btn", {value:deck, onclick:m.withAttr("value", ctrl.addDeck)}, [m("i.material-icons.left", "library_add"),"Get This Deck"]),
                m("a.waves-effect.waves-light.btn", {value:deck, onclick:function(){alert("This functionality coming soon!")}}, [m("i.material-icons.left", "grade"),"Try Out This Deck"])
              ])
            ])
          ])
        ])
      )
    }

    return m("cow",[
     m(".row", [
        m(".col.s12.m7.l7.offset-l3.offset-m2", [
          m("h5.", "Select a shared deck to add to your own decks:"),
          m("", mArray)
        ])
      ])
    ])
  }

  shared.controller = function(){
    ctrl = this;
    Deck.fetch("shared")
    .then(function(res){
      console.log("client got res: ", res);
      ctrl.shared = res.decks;
    })

    ctrl.addDeck = function(deckName){
      Deck.createDeck(deckName,ctrl.shared[deckName])
      User.sync();
      Materialize.toast('You now have ' + deckName + '!', 4000);
    };
  }
})();
