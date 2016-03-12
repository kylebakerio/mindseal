(function(){
  window.shared = {};
  console.log("declaring shared")
  shared.view = function(ctrl){
    var mArray = [];
    
    if (Object.keys(ctrl.shared).length < 1) {
      mArray.push( m(".row", [
        m(".col.s12.m7.l7.offset-l3.offset-m2", [
          m(".card.blue-grey.darken-1", [
            m(".card-content.white-text", [
              m("span.card-title", "Server may be down at this time; please try again later.")
              ])
            ])
          ])
        ])
      );
    }

    for (var deck in ctrl.shared){
      mArray.push(
        m(".card.blue-grey.darken-1", {config:App.animate},[
          m(".card-content.white-text", [
            m("span.card-title", ctrl.shared[deck].name),
            m("p", "Size of deck: " + (ctrl.shared[deck].cards.length + ctrl.shared[deck].unseen.length)), 
            m("br"),
            m("p", "Author: " + ctrl.shared[deck].author),
            m("br"),
            ctrl.shared[deck].description ?
              m("div",[m("p", "Description: " + ctrl.shared[deck].description), m("br") ])
            :
              m("p", "No description given.")
          ]),
          m(".card-action", [
            m("a.waves-effect.waves-light.btn", {value:deck, onclick:m.withAttr("value", ctrl.addDeck)}, [m("i.material-icons.left", "library_add"),"Get Deck"]),
            m("a.waves-effect.waves-light.btn", {value:deck, onclick:function(){alert("This functionality coming soon!")}}, [m("i.material-icons.left", "grade"),"Try Deck"])
          ])
        ])
      )
    }

    return m("cow",[
     m(".row", [
        m(".col.s12.m7.l7.offset-l3.offset-m2", [
          m("h5.", "Select a shared deck to add to your own decks:"),
          m("div", mArray)
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
      Materialize.toast('You now have ' + App.mindSeal.decks[deckName].name, 4000);
      $('li').eq(1).velocity({opacity:0.1}, { duration: 700 })
      .velocity("fadeIn", { duration: 700 });
      $('i.mdi-navigation-menu').velocity("callout.shake");
    };

    ctrl.onunload = function(){
      m.startComputation();
      App.animate($('.card'),true,0,"ex")
    }
  }
})();
