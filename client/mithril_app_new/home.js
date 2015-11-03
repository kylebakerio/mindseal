(function(){
  window.Home = {};

  Home.view = function(ctrl){  
    return m(".cow.col.s12", [
      m(".row", [
        m(".col.s12.m7.l7.offset-l3.offset-m2", [
          m("h2", "Welcome!"),
          m("p", ["You've reviewed ",m("b", App.mindSeal.userSettings.todayCounter)," cards today."]),
          // m("p", ["You have ",m("b", ctrl.remaining)," cards to go to meet your daily quota."]),
          m("p", ["You've reviewed ",m("b", App.mindSeal.userSettings.allTimeCounter)," cards since you joined " + moment(App.mindSeal.userSettings.accountMade).fromNow() + " ago."]),
        ])
      ]),

      App.mindSeal && App.mindSeal.decks && Object.keys(App.mindSeal.decks).length !== 0 ? [

        Object.keys(App.mindSeal.decks).map(function(deckName) {
          return deckView(ctrl, deckName)
        })
        
      ] : [
        m(".row", [
          m(".col.s12.m7.l7.offset-l3.offset-m2", [
            m("a.waves-effect.waves-light.btn", {onclick:function(){m.route("/shared")}}, [m("i.material-icons.left", "file_download"),"Get Shared Deck"]),
            m("br"),
            m("a.waves-effect.waves-light.btn", {onclick:function(){m.route("/newDeck")}}, [m("i.material-icons.left", "create"),"Create new deck"]),
          ])
        ])
      ],

    ])
  };

  Home.controller = function(args){
    ctrl = this;
    ctrl.deckStates = {}
    ctrl.remaining = "todo"

    ctrl.share    = function(deckName){
      Deck.share(App.mindSeal.decks[deckName], deckName);
      Materialize.toast('Shared ' + App.mindSeal.decks[deckName].name, 4000);
    }

    ctrl.makeCard = function(deckName){ //populates the values of the card from the form and calls the view
      var newCard = {front: $("#" + deckName + "-front").val(), back: $("#" + deckName + "-back").val()}
      Deck.binaryInsert(null, App.mindSeal.decks[deckName].cards, "toBeSeen", Card.vm(newCard));
      $("#" + deckName + "-front").val("")
      $("#" + deckName + "-back").val("")

      //for materialize fields:
      $("#" + deckName + "-front").trigger('autoresize');
      $("#" + deckName + "-back").trigger('autoresize');

      Materialize.toast('Card Added', 4000);
      User.sync();
    }

    ctrl.deleteDeck = function(deckName){
      if (confirm("Are you sure?")) {
        delete App.mindSeal.decks[deckName];
        User.sync();
      }
    }

    ctrl.toggleDeckView = function(deckName){
      if ( 
        ( $("#" + deckName + "-front").val() === "" && $("#" + deckName + "-back").val() === "" ) ||
        ( ($("#" + deckName + "-front").val() !== "" || $("#" + deckName + "-back").val() !== "") && confirm("Are you sure you want to exit without saving this card?") )
        ){
        console.log("fields: ", $("#" + deckName + "-front").val() === "", $("#" + deckName + "-back").val() === "")
        ctrl.deckStates[deckName] = 'dash';
      }
    }
  };

  function deckView (ctrl, deckName) {
    if (ctrl.deckStates[deckName] === 'editing_cards') {
      return deckAddCardsView(ctrl, deckName)
    }
    else {
      return deckDashView(ctrl, deckName)
    }
  }

  function deckDashView (ctrl, deckName) {
    var deckSize = App.mindSeal.decks[deckName].cards.length + App.mindSeal.decks[deckName].unseen.length;
    return m(".row", [
      m(".col.s12.m7.l7.offset-l3.offset-m2", [
        m(".card.blue-grey.darken-1.hoverable", [
          m(".card-content.white-text", [
            m("span.card-title", App.mindSeal.decks[deckName].name),
             m("p","Date Created: " + moment(App.mindSeal.decks[deckName].creation).format("MMM Do, YYYY")),
              m("p", /*"Cards to be seen: todo",m("br"),*/"Cards in deck: "+ deckSize),
              m("p", ( deckSize > 0 ? 
                          App.mindSeal.decks[deckName].unseen.length > 0 ? 
                           "Next card ready to review: Now" :
                            ( "Next card ready to review: " + 
                            moment(App.mindSeal.decks[deckName].cards[0].toBeSeen).format("MMM Do, YYYY hh:mm a") + ", " + 
                            moment(App.mindSeal.decks[deckName].cards[0].toBeSeen).fromNow() /*+
                              moment().diff(App.mindSeal.decks[deckName].cards[0].toBeSeen) > 0 ? 
                              "No cards ready to view at this time." :
                              ""*/
                            ) :
                        "Deck is empty." 
                      )
                ),
          m(".card-action", [
            deckSize < 1 || (App.mindSeal.decks[deckName].unseen.length < 1 && App.mindSeal.decks[deckName].cards.length > 0 && moment().diff(moment(App.mindSeal.decks[deckName].cards[0].toBeSeen)) < 0 ) ?
            m("a.waves-effect.waves-light.btn.disabled", {title:"Add some cards, first!"}, [m("i.material-icons.left", "grade"),"Review"]) :
            m("a.waves-effect.waves-light.btn", {href:('#/viewDeck/' + deckName)}, [m("i.material-icons.left", "grade"),"Review"]),

            m("a.waves-effect.waves-light.btn", {onclick:function(){ctrl.deckStates[deckName] = 'editing_cards'}}, [m("i.material-icons.left", "library_add"),"Add Cards"]),

            m("a.waves-effect.waves-light.btn", {onclick:function(){alert("feature coming soon")}}, [m("i.material-icons.left.large.material-icons", "settings"),"Options"]),
            
            deckSize < 1 ?
            m("a.waves-effect.waves-light.btn.disabled", {title:"Can't share an empty deck with other users."} , [m("i.material-icons.left", "call_split"),"Share"]) :
            m("a.waves-effect.waves-light.btn", {onclick:function(){ctrl.share(deckName)}, title:"Share this deck in the public repository for other users to download." }, [m("i.material-icons.left", "call_split"),"Share"]),
            
            m("a.waves-effect.waves-light.btn", {onclick:function(){ctrl.deleteDeck(deckName)}}, [m("i.material-icons.left", "delete"),"Delete"])
          ])
        ])
      ])
    ])
  ])
  }

  function deckAddCardsView (ctrl, deckName) {
    // console.log(App.mindSeal.decks[deckName].cards[0].toBeSeen, deckName)
    var deckSize = App.mindSeal.decks[deckName].cards.length + App.mindSeal.decks[deckName].unseen.length;
    return m(".row", [
      m(".col.s12.m7.l7.offset-l3.offset-m2", [
        m(".card.blue-grey.darken-1", [
          m(".card-content.white-text", [
            m("span.card-title", App.mindSeal.decks[deckName].name),
            m("p","Date Created: " + moment(App.mindSeal.decks[deckName].creation).format("MMM Do, YYYY")),
            m("p", /*"Cards to be seen: todo",m("br"),*/"Cards in deck: "+ deckSize),
            m("p", ( deckSize > 0 ? 
                        App.mindSeal.decks[deckName].unseen.length > 0 ? 
                         "Next card ready to review: Now" :
                          ( "Next card ready to review: " + 
                          moment(App.mindSeal.decks[deckName].cards[0].toBeSeen).format("MMM Do, YYYY hh:mm a") + ", " + 
                          moment(App.mindSeal.decks[deckName].cards[0].toBeSeen).fromNow() /*+
                            moment().diff(App.mindSeal.decks[deckName].cards[0].toBeSeen) > 0 ? 
                            "No cards ready to view at this time." :
                            ""*/
                          ) :
                      "Deck is empty." 
                    )
              ),
            m(".row", [
              m(".input-field.col.s12.m6", [
                m("input.materialize-textarea", {id:deckName + "-front", type:'text'}),
                m("label",{for:deckName + '-front'}, "Card Prompt")
              ]),
              m(".input-field.col.s12.m6", [
                m("input.materialize-textarea", {id:deckName + "-back", type:'text'}),
                m("label",{for:deckName + '-back'}, "Card Answer")
              ])
            ]),
            m("a.btn-floating.waves-effect.waves-light.blue",{onclick: function(){ctrl.makeCard(deckName)}, title:"Click here to add the card you're working on."}, [m("i.material-icons", "add")])
          ]),
          m(".card-action", [
            m("a.waves-effect.waves-light.btn.blue",{onclick:function(){ctrl.toggleDeckView(deckName)}, title:"Click here when you don't want to add any more cards."}, [m("i.material-icons.left", "done_all"),"Done Adding Cards"])
          ])
        ])
      ])
    ])
  }

})()
