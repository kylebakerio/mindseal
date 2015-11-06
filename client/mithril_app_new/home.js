(function(){
  console.log("declaring home")
  window.Home = {};

  Home.view = function(ctrl){  
    return App.mindSeal && App.mindSeal.decks && Object.keys(App.mindSeal.decks).length !== 0 ? 
        m(".cow.col.s12", [
          m(".row", [
            m(".col.s12.m7.l7.offset-l3.offset-m2", [
              m("h2", "Welcome!"),
              m("p", ["You've reviewed ",m("b", App.mindSeal.userSettings.todayCounter)," cards today."]),
              // m("p", ["You have ",m("b", ctrl.remaining)," cards to go to meet your daily quota."]),
              m("p", ["You've reviewed ",m("b", App.mindSeal.userSettings.allTimeCounter)," cards since you joined " + moment(App.mindSeal.userSettings.accountMade).fromNow() + " ago."]),
            ]),
          Object.keys(App.mindSeal.decks).map(function(deckName) {
            ctrl.deckCount+=1;
            return deckView(ctrl, deckName, ctrl.deckCount)
          }),
        ])
      ])
      : 
      m(".row", [
        m(".col.s10.offset-s2.m7.l7.offset-l3.offset-m2", [
          m("h2", "Welcome!"),
          m("a.waves-effect.waves-light.btn", {onclick:function(){m.route("/shared")}}, [m("i.material-icons.left", "file_download"),"Get Shared Deck"]),
          m("br"),
          m("a.waves-effect.waves-light.btn", {onclick:function(){m.route("/newDeck")}}, [m("i.material-icons.left", "create"),"Create new deck"]),
        ])
      ])
  };

  Home.controller = function(args){
    ctrl = this;

    ctrl.deckStates = {}
    ctrl.remaining = "todo"
    ctrl.deckCount = 0;
    ctrl.onunload = function(){
      if ($('.card').length > 0){
        m.startComputation();
        App.animate($('.card'),true,0,"ex")
      }
    }

    // App.animate = function(elem,init,num,enEx,context){
      
    //   //elem is the element itself, init is whether this is elem has already been initialized,
    //   //num is what index the item being transitioned is in its list, enEx is for enter/exit,
    //   //and tells us whether we're animating away or towards us.
    //   if (!init) $(elem).velocity("transition.flipYIn", {delay:num*100})
    //   else if (enEx === "ex") {
    //     $(elem).velocity("transition.flipYOut", { delay:num*100, complete:function(){m.endComputation()} }  )
    //   }
    // }

    ctrl.share    = function(deckName){
      Deck.share(App.mindSeal.decks[deckName], deckName);
      Materialize.toast('Shared ' + App.mindSeal.decks[deckName].name, 4000);
    }

    ctrl.makeCard = function(deckName){ //populates the values of the card from the form and calls the view
      if ($("#" + deckName + "-front").val() === "" || $("#" + deckName + "-back").val() === "") {
        alert("Please enter a prompt and and answer.")
      } else {
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
        ctrl.deckStates[deckName] = 'dash';
      }
    }
        
  };

  function deckView (ctrl, deckName, num) {
    if (ctrl.deckStates[deckName] === 'editing_cards') {
      return deckAddCardsView(ctrl, deckName, 0)
    }
    else if (ctrl.deckStates[deckName] === 'dash'){
      return deckDashView(ctrl, deckName, 0)
    }
    else {
      return deckDashView(ctrl, deckName, num)
    }
  }

  function deckDashView (ctrl, deckName, num) {
    console.log(num);
    var deckSize = App.mindSeal.decks[deckName].cards.length + App.mindSeal.decks[deckName].unseen.length;
    return m(".row", [
      m(".col.s12.m7.l7.offset-l3.offset-m2", [
        m('.card.blue-grey.darken-1.hoverable[id="'+deckName+'"]', { 
          config:function(elem,init,context){
            // context.onunload = function() {App.animate(elem,true,0,"ex")};
            App.animate(elem,init,num,"in",context);
          } 
        }, [
          m('.card-content.white-text', [
            m("span.card-title", App.mindSeal.decks[deckName].name),
             m("p","Date Created: " + moment(App.mindSeal.decks[deckName].creation).format("MMM Do, YYYY")),
              m("p", /*"Cards to be seen: todo",m("br"),*/"Cards in deck: "+ deckSize),
              m("p", ( deckSize > 0 ? 
                          App.mindSeal.decks[deckName].unseen.length > 0 ? // next line: if first & second are true
                           "Next card ready to review: Now" : //below: if first was true but second was false.
                            ( "Next card ready to review: " + 
                            moment(App.mindSeal.decks[deckName].cards[0].toBeSeen).format("MMM Do, YYYY hh:mm a") + ", " + 
                            moment(App.mindSeal.decks[deckName].cards[0].toBeSeen).fromNow() /*+
                              moment().diff(App.mindSeal.decks[deckName].cards[0].toBeSeen) > 0 ? 
                              "No cards ready to view at this time." :
                              ""*/
                            ) : //below: if first condition is false
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

  function deckAddCardsView (ctrl, deckName, num) {
    // console.log(App.mindSeal.decks[deckName].cards[0].toBeSeen, deckName)
    var deckSize = App.mindSeal.decks[deckName].cards.length + App.mindSeal.decks[deckName].unseen.length;
    return m(".row", [
      m(".col.s12.m7.l7.offset-l3.offset-m2", [
        m(".card.blue-grey.darken-1", {config:function(elem,init){App.animate(elem,init,num,"in")} }, [
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
                m("input.materialize-textarea", {id:deckName + "-front", type:'text'/*, placeholder:"Question goes here"*/}),
                m("label",{for:deckName + '-front'}, "Card Prompt")
              ]),
              m(".input-field.col.s12.m6", [
                m("input.materialize-textarea", {id:deckName + "-back", type:'text'/*, placeholder:"Answer goes here"*/}),
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
