(function(){
  console.log("declaring viewDeck")
  window.viewDeck = {};

  viewDeck.view = function(ctrl){
    window.currentDeck = ctrl.currentDeck;
    return m(".anteater.col.s12", [
      m(".row", [
        m(".center-align.col.s12.m7.l7.offset-l3.offset-m2", [
          m("h3", ctrl.name),
          m(".hide-on-small-only", [
            m("p", [m("b", ctrl.currentDeck.cards.length + ctrl.currentDeck.unseen.length)," cards in this deck. "/*,m("b", "todo")," ready to be seen."*/]),
            m("p", "you have " + ctrl.currentDeck.unseen.length + " unseen cards in this deck."),
            m("p", ["You've reviewed ",m("b", App.mindSeal.userSettings.todayCounter)," cards today."]),
            // m("p", ["You have ",m("b", "todo" + " remaining to meet your quota.")]),
            m("p", ["You've reviewed ",m("b", App.mindSeal.userSettings.allTimeCounter)," cards since you joined " + moment(App.mindSeal.userSettings.accountMade).fromNow() + " ago."]),
            m('br'),
          ]),
          m("div",ctrl.cardView)
        ])
      ])
    ])
  };

  viewDeck.controller = function(argObj){
    var ctrl = this;
    ctrl.laskClick = ""; // needs to be evaluated, doesn't seem to work as intended.
    ctrl.index = 0;
    ctrl.name = argObj.name;
    ctrl.deck = argObj.deck;
    ctrl.currentDeck = argObj.deck;

    if (ctrl.currentDeck.cards.length > 0 && moment().diff(moment(ctrl.currentDeck.cards[0].toBeSeen)) > 0 ){
      ctrl.currentCard = ctrl.currentDeck.cards[0];
      ctrl.stack = "cards";
    }
    else if (ctrl.currentDeck.unseen.length > 0){
      ctrl.currentCard = ctrl.currentDeck.unseen[0];
      ctrl.stack = "unseen";
    }
    else {
      console.log("empty deck... routing home")
      ctrl.currentCard = ctrl.currentDeck.cards[0];
      m.route('/home')
    }

    //note that the logic for initial declaration of ctrl.cardView happens at the bottom of the page, to use functions declared between here and there.

    ctrl.remaining = function(){
      return ctrl.currentDeck[ctrl.stack].length-ctrl.index
    }; //should be updated to take dates into account & should live update

    ctrl.onunload = function(){
      m.startComputation();
      App.animate($('.card'),true,0,"ex")
    }

    ctrl.rate = function(button){
      //the following lines *should* prevent doubleclicks, or clicks while server is syncing, from causing problems.
      if (ctrl.lastClick === ctrl.currentCard.front){
        console.log("doubleclick caught")
        return ;
      } 
      else {
        console.log("doubleclick not caught.")
        ctrl.lastClick = ctrl.currentCard.front;
      }

      if (ctrl.currentCard.timeLastSeen !== "shared") {
        var convert = {
          0: ctrl.currentCard.cScale[0],
          1: ctrl.currentCard.cScale[1],
          2: ctrl.currentCard.cScale[2],
          3: ctrl.currentCard.cScale[3]
        }
        console.log("old tval: " + (moment.duration(tVal).asMinutes()).toFixed(1) + " minutes.");
        console.log("old time last seen: " + moment(ctrl.currentCard.timeLastSeen).fromNow());
        console.log("old time to be seen: " + moment(ctrl.currentCard.toBeSeen).fromNow());
        var tVal = moment.duration(moment().diff(moment(ctrl.currentCard.timeLastSeen)));
        tVal *= convert[button]; 
      }
      else {
        console.log("rating a previously unseen card.");
        var convert = 
          {
            0: App.mindSeal.userSettings.cScaleDefault[0],
            1: App.mindSeal.userSettings.cScaleDefault[1],
            2: App.mindSeal.userSettings.cScaleDefault[2],
            3: App.mindSeal.userSettings.cScaleDefault[3]
          };
        var tVal = App.mindSeal.userSettings.tValDefault;
      }
      
      console.log("convert[button] " + convert[button]);
      console.log("new tval: " + (moment.duration(tVal).asMinutes()).toFixed(1) + " minutes.");
      
      ctrl.currentCard.timeLastSeen = moment().format(); //it was just seen now.
      console.log("new time last seen: " + moment(ctrl.currentCard.timeLastSeen).fromNow());
      
      ctrl.currentCard.toBeSeen = ( 
        moment(ctrl.currentCard.timeLastSeen).clone().add(tVal, 'milliseconds').format()
      );

      console.log("new time to be seen: " + moment(ctrl.currentCard.toBeSeen).fromNow());
      
      console.log("next viewing in: " + 
        (moment.duration(moment(ctrl.currentCard.toBeSeen).diff(moment(ctrl.currentCard.timeLastSeen))).asDays()).toFixed(3) + 
        " days."
      );

      if (ctrl.stack === "unseen") {
        Deck.binaryInsert(null, ctrl.currentDeck.cards, "toBeSeen", ctrl.currentCard);
      }
      else {
        Deck.binaryInsert(ctrl.index, ctrl.currentDeck.cards, "toBeSeen");
      }

      //want to delete from unseen if rated, because it has been inserted into 'cards'... otherwise will review shared perpetually.
      if (ctrl.stack === "unseen") {
        currentDeck[ctrl.stack].shift();
      }
      //index should go down to keep up with shrinking deck.
      ctrl.index--;
      ctrl.nextCard();
      ctrl.toggleBack();
      console.log(Deck.isSorted(ctrl.currentDeck.cards) ? "Insertion was successful." : "Insertion failed. Please sort manually.");
      Card.counter();
      User.sync();
    }

    viewDeck.noMore = function(){
      ctrl.remaining = function(){return 0};
      console.log("current card: " + ctrl.currentCard.front);
      next = ctrl.currentDeck.cards[ctrl.index + 1] ? ctrl.index + 1 : 0; // if truthy, we hit an unready card; if falsy, we hit end, and look at card 1.
      ctrl.cardView =[m("h3", "Great work!"),m('p','No more cards to view for now.'),m('br'),m("p","Next card ready to review: " + 
          moment(ctrl.currentCard.toBeSeen).format("MMM Do, YYYY hh:mm a") + 
          ", " + moment(ctrl.currentDeck.cards[next].toBeSeen).fromNow())] 
      // should be an optional overtime study button here.
      console.log("noMore ran");
      m.route('/home');
    }

    ctrl.nextCard = function () {
      // future feature: this if condition should also check how many cards have been viewed this day vs quota (from settings).
      if(ctrl.currentDeck[ctrl.stack].length <= ctrl.index +1 || // no more cards in stack (also should === true when unseen is empty)
        (ctrl.stack === "cards" && moment().diff(ctrl.currentDeck.cards[ctrl.index +1].toBeSeen) < 0) // next card in stack isn't ready to be seen
        ) {
        console.log(ctrl.currentDeck[ctrl.stack].length <= ctrl.index +1 ? "hit last card" : "hit a card not ready to be shown");
        if (moment().diff(ctrl.currentDeck.cards[0].toBeSeen) > 0) { // check first card in "cards" stack before we can really call it quits
          ctrl.index = 0; // jump to the first card and go around again until we run into this again
          ctrl.stack = "cards"; // if we hit the end of 'unseen' and are jumping over to 'cards'
          ctrl.currentCard = ctrl.currentDeck.cards[0];
        }
        else if (ctrl.currentDeck.unseen.length > 0) { // check if we can jump to any unseen cards from here
          ctrl.index = 0; // jump to the first card and go around again until we run into this again
          ctrl.stack = "unseen"; // if we hit the end of 'unseen' and are jumping over to 'cards'
          ctrl.currentCard = ctrl.currentDeck.unseen[0];
        }
        else { // we've run out of cards in both stacks.
          viewDeck.noMore();
        } 
      }
      else { // still cards in this stack, keep going.
        ctrl.index++;
        ctrl.currentCard = ctrl.currentDeck[ctrl.stack][ctrl.index];
      }
    }

    ctrl.toggleBack = function(){
      console.log("ctrl.remaining():",ctrl.remaining());
      if (ctrl.remaining() > 0) { // there are still cards in this deck.
        if (ctrl.show === false ){ // the back is currently not shown
          
          ctrl.cardView = [
            m(".row", [
              m(".col.s12.m7.l7.offset-l3.offset-m2", [
                m(".card.blue-grey.darken-1", { 
                  config:function(elem,init,context){
                    // context.onunload = function() {App.animate(elem,true,0,"ex")};
                    App.animate(elem,init,0,"in",context);
                  } 
                }, [
                  m(".card-content.white-text", [
                    m("p.center-align", ctrl.currentCard.front)
                  ]),
                  m(".divider.col.s8.offset-s2"),
                  m(".card-content.white-text", [
                    m("p.center-align", ctrl.currentCard.back),
                    m("br"),
                    m("a.edit.grey.waves-effect.waves-light.btn", {onclick: function(){alert("Feature coming soon!")}},[m("i.material-icons.center.large.material-icons", "mode_edit")])
                  ]),
                  m(".center-align.card-action", [
                    m("a.red.darken-3.mem1.waves-effect.waves-light.btn-large", {value:0, onclick: m.withAttr("value", ctrl.rate), title:"protip: try using numbers as hotkeys."}, [m("i.material-icons.left.large.material-icons", "looks_one"),"Forgot"]),
                    m("a.deep-purple.darken-3.mem2.waves-effect.waves-light.btn-large", {value:1, onclick: m.withAttr("value", ctrl.rate), title:"protip: try using numbers as hotkeys."}, [m("i.material-icons.left.large.material-icons", "looks_two"),"Hard"]),
                    m("a.light-blue.darken-2.mem3.waves-effect.waves-light.btn-large", {value:2, onclick: m.withAttr("value", ctrl.rate), title:"protip: try using numbers as hotkeys."}, [m("i.material-icons.left.large.material-icons", "looks_3"),"Good"]),
                    m("a.green.darken-2.mem4.waves-effect.waves-light.btn-large", {value:3, onclick: m.withAttr("value", ctrl.rate), title:"protip: try using numbers as hotkeys."}, [m("i.material-icons.left.large.material-icons", "looks_4"),"Too Easy"])
                  ])
                ])
              ])
            ])
          ]

          ctrl.show = true; // the back is now shown.
        }
        else {
          
          ctrl.cardView = [
            m(".row", [
              m(".col.s12.m7.l7.offset-l3.offset-m2", [
                m(".card.blue-grey.darken-1", { 
                  config:function(elem,init,context){
                    // pattern to potentially explore to allow onunload animation of individual elements:
                    // context.onunload = function() {App.animate(elem,true,0,"ex")}; 
                    App.animate(elem,init,0,"in",context);
                  } 
                }, [
                  m(".card-content.white-text", [
                    m("p.center-align", ctrl.currentCard.front)
                  ]),
                  m(".align-center.card-action.center-align", [
                    m("a.waves-effect.waves-light.btn",{onclick: ctrl.toggleBack, title:'protip: use the spacebar shortcut!'}, [m("i.material-icons.left", "grade"),"Show Back"])
                  ])
                ])
              ])
            ])
          ]
          ctrl.show = false; // the back is now hidden.
        }

      }
    }
    //
    // determine ctrl.cardView initial definition before view is loaded.
    if (ctrl.currentCard.toBeSeen === "shared" || moment().diff(ctrl.currentCard.toBeSeen) > 0) {
      ctrl.show = true;
      ctrl.toggleBack();
    } else {
      console.log("currentCard was",ctrl.currentCard)
      viewDeck.noMore();
      // should add an overtime button.
    }
    // end cardView determination
    //
  }
})()
