(function(){
  window.viewDeck = {};

  viewDeck.view = function(ctrl){
    window.currentDeck = ctrl.currentDeck;
    return m(".anteater.col.s12", [
      m(".row", [
        m(".center-align.col.s12.m7.l7.offset-l3.offset-m2", [
          m("h3", ctrl.name),
          m(".hide-on-small-only", [
            m("p", [m("b", ctrl.currentDeck.cards.length)," cards in this deck, ",m("b", "todo")," ready to be seen."]),
            m("p", ["You've reviewed ",m("b", "todo")," cards in this deck today."]),
            m("p", ["You have ",m("b", ctrl.remaining + " remaining to meet your quota.")]),
            m("p", ["You've reviewed ",m("b", "todo")," cards since 1 month ago."]),
            m('br'),
            m("",ctrl.cardView)
          ])
        ])
      ])
    ])
  };

  viewDeck.controller = function(args){
    var ctrl = this;
    ctrl.index = 0;
    ctrl.name = args.name;
    ctrl.deck = args.deck;
    ctrl.currentDeck = args.deck;
    ctrl.currentCard = ctrl.currentDeck.cards[0]; 
    ctrl.show = false;
    ctrl.remaining = ctrl.currentDeck.cards.length-ctrl.index; //should be updated to take dates into account & should live update

    ctrl.rate = function(button){
      if (ctrl.currentCard.timeLastSeen === "shared") {
        ctrl.currentCard.timeLastSeen = moment().format();
        var convert = App.mindSeal.userSettings.cScaleDefault ?
        {
          0: App.mindSeal.userSettings.cScaleDefault[0],
          1: App.mindSeal.userSettings.cScaleDefault[1],
          2: App.mindSeal.userSettings.cScaleDefault[2],
          3: App.mindSeal.userSettings.cScaleDefault[3]
        }
        : ( console.log("no cScaleDefault found"),
            {
              0: ctrl.currentCard.cScale[0],
              1: ctrl.currentCard.cScale[1],
              2: ctrl.currentCard.cScale[2],
              3: ctrl.currentCard.cScale[3]
            }
          )
      }
      else {
        var convert = {
          0: ctrl.currentCard.cScale[0],
          1: ctrl.currentCard.cScale[1],
          2: ctrl.currentCard.cScale[2],
          3: ctrl.currentCard.cScale[3]
        }
      }
      console.log("convert[button] " + convert[button])
      
      var tVal = moment.duration(moment().diff(moment(ctrl.currentCard.timeLastSeen)));
      console.log("old tval: " + (moment.duration(tVal).asMinutes()).toFixed(1) + " minutes.");
      tVal *= convert[button]; 
      console.log("new tval: " + (moment.duration(tVal).asMinutes()).toFixed(1) + " minutes.");
      
      console.log("old time last seen: " + moment(ctrl.currentCard.timeLastSeen).fromNow());
      ctrl.currentCard.timeLastSeen = moment().format(); //it was just seen now.
      console.log("new time last seen: " + moment(ctrl.currentCard.timeLastSeen).fromNow());
      
      console.log("old time to be seen: " + moment(ctrl.currentCard.toBeSeen).fromNow());
      ctrl.currentCard.toBeSeen = ( 
        moment(ctrl.currentCard.timeLastSeen).clone().add(tVal, 'milliseconds').format()
      );
      console.log("new time to be seen: " + moment(ctrl.currentCard.toBeSeen).fromNow());
      
      console.log("next viewing in: " + 
        (moment.duration(moment(ctrl.currentCard.toBeSeen).diff(moment(ctrl.currentCard.timeLastSeen))).asDays()).toFixed(3) + 
        " days."
      );

      Deck.binaryInsert(ctrl.index, ctrl.currentDeck.cards, "toBeSeen");
      ctrl.nextCard();
      ctrl.toggleBack();
      console.log(Deck.isSorted(ctrl.currentDeck.cards) ? "Insertion was successful." : "Insertion failed. Please sort manually.");
      User.sync();
    }

    viewDeck.noMore = function(){
      ctrl.remaining = 0;
      console.log("current card: " + ctrl.currentCard.front);
      next = ctrl.currentDeck.cards[ctrl.index + 1] ? ctrl.index + 1 : 0;
      ctrl.cardView =[m("h1", "Great work!"),m('p','No more cards to view for now.'),m('br'),m("p","Next card ready to review: " + 
          moment(ctrl.currentCard.toBeSeen).format("MMM Do, YYYY hh:mm a") + 
          ", " + moment(ctrl.currentDeck.cards[next].toBeSeen).fromNow())] //should be an overtime button.
      m.redraw()
      console.log("noMore ran")
    }

    ctrl.nextCard = function () {
      //this if condition should also check how many cards have been viewed this day vs max to be viewed (from settings).
      if(ctrl.currentDeck.cards.length <= ctrl.index +1 || 
        ctrl.currentDeck.cards[ctrl.index +1].toBeSeen === "shared" ||
        (moment().diff(ctrl.currentDeck.cards[ctrl.index +1].toBeSeen) < 0)
        ) {
        console.log(ctrl.currentDeck.cards.length <= ctrl.index +1 ? "hit last card" : "hit a card not ready to be shown");
        // console.log("Next card's toBeSeen timestamp is: " + ctrl.currentDeck.cards[ctrl.index+1].toBeSeen.fromNow());
        if (moment().diff(ctrl.currentDeck.cards[0].toBeSeen) > 0) {
          ctrl.index = 0;
          Card.counter();
          ctrl.currentCard = ctrl.currentDeck.cards[0];
          ctrl.remaining = ctrl.currentDeck.cards.length-ctrl.index;
        }
        else viewDeck.noMore();
      }
      else {
        ctrl.index++;
        Card.counter(); 
        ctrl.currentCard = ctrl.currentDeck.cards[ctrl.index];
        ctrl.remaining = ctrl.currentDeck.cards.length-ctrl.index;
      }
    }

    ctrl.toggleBack = function(){
      if (ctrl.remaining > 0) {
        if (ctrl.show !== true ){
          
          ctrl.cardView = [
            m(".row", [
              m(".col.s12.m7.l7.offset-l3.offset-m2", [
                m(".card.blue-grey.darken-1", [
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


          // ctrl.back([
          //   m(".card.back.center-block", ctrl.currentCard.back),
          //   m('br'),
          //   m("input",{type:'button', onclick: m.withAttr("value", ctrl.rate), value:'Did not remember', title:"Press 0 to select"}),
          //   m("input",{type:'button', onclick: m.withAttr("value", ctrl.rate), value:'Hard', title:"Press 1 to select"}),
          //   m("input",{type:'button', onclick: m.withAttr("value", ctrl.rate), value:'Good', title:"Press 2 to select"}),
          //   m("input",{type:'button', onclick: m.withAttr("value", ctrl.rate), value:'Too Easy', title:"Press 3 to select"})
          // ]);
          ctrl.show = true;
        }
        else {
          ctrl.show = false;
          ctrl.cardView = [
            m(".row", [
              m(".col.s12.m7.l7.offset-l3.offset-m2", [
                m(".card.blue-grey.darken-1", [
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
        }
      }
    }

    if (ctrl.currentDeck.cards[0].toBeSeen === "shared" || 
        moment().diff(ctrl.currentDeck.cards[0].toBeSeen) > 0) {
      ctrl.cardView = [
        m(".row", [
          m(".col.s12.m7.l7.offset-l3.offset-m2", [
            m(".card.blue-grey.darken-1", [
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

    } else {
      ctrl.cardView = [
        m('br'),m("p","Next card ready to review: " + 
        moment(ctrl.currentCard.toBeSeen).format("MMM Do, YYYY hh:mm a") + 
        ", " + moment(ctrl.currentDeck.cards[ctrl.index].toBeSeen).fromNow())]
        //should add an overtime button.
    }

  }
})()
