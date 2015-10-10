(function(){

  window.viewDeck = {};

  viewDeck.view = function(ctrl){
    window.currentDeck = ctrl.currentDeck;
    return m(".container",[
      m('br'),
      m("a", {href:('#/deckDash/' + ctrl.name)}, 
        m("input[type='button']",{value:("Back to " + ctrl.name + "'s dashboard")})
      ),
      m(".starter-template", [
        m("h1", ctrl.name),
        m('br'),
        m('strong','cards remaining in deck: ' + ctrl.remaining),
        m('br'),
        // m('strong','minutes studied today:'),m('br'), //would be nice.
        m('br'),
        m(".center-block", [
          ctrl.front(),
          m('br'),
          ctrl.back()
        ])
      ])
    ])
  }

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
      var convert = {
        'Did not remember': ctrl.currentCard.cScale[0],
        'Hard': ctrl.currentCard.cScale[1],
        'Good': ctrl.currentCard.cScale[2],
        'Too Easy': ctrl.currentCard.cScale[3]
      }
      console.log("convert[button] " + convert[button])

      var tVal = moment.duration(moment().diff(moment(ctrl.currentCard.timeLastSeen)));
      console.log("old tval: " + (moment.duration(tVal).asHours()).toFixed(3) + " hours.");
      tVal *= convert[button]; 
      console.log("new tval: " + (moment.duration(tVal).asHours()).toFixed(3) + " hours.");
      
      console.log("old time last seen: " + moment(ctrl.currentCard.timeLastSeen).fromNow());
      ctrl.currentCard.timeLastSeen = moment().format(); //it was just seen now.
      console.log("new time last seen: " + moment(ctrl.currentCard.timeLastSeen).fromNow());
      
      console.log("old time to be seen: " + moment(ctrl.currentCard.toBeSeen).fromNow());
      ctrl.currentCard.toBeSeen = ( 
        moment(ctrl.currentCard.timeLastSeen).clone().add(tVal, 'milliseconds').format()
      );
      console.log("new time to be seen: " + moment(ctrl.currentCard.toBeSeen).fromNow());
      
      console.log("next viewing in: " + 
        moment.duration(moment(ctrl.currentCard.toBeSeen).diff(moment(ctrl.currentCard.timeLastSeen))).asDays()
      );

      Deck.binaryInsert(ctrl.index, ctrl.currentDeck.cards, "toBeSeen");
      ctrl.nextCard();
      ctrl.toggleBack();
      console.log(Deck.isSorted(ctrl.currentDeck.cards) ? "Insertion was successful." : "Insertion failed. Please sort manually.");
    }

    viewDeck.noMore = function(){
      ctrl.remaining = 0;
      ctrl.front([m("h1.center-block", "Great work!"),m('p.lead','No more cards to view for now.')])
      //include something to mention how long until the next card should be seen, or a message that 
      //card limit for day has been hit.
      console.log("current card: " + ctrl.currentCard.front);
      next = ctrl.currentDeck.cards[ctrl.index + 1] ? ctrl.index + 1 : 0;
      ctrl.back([m('br'),m("p","Next card ready to review: " + 
          moment(ctrl.currentCard.toBeSeen).format("MMM Do, YYYY hh:mm a") + 
          ", " + moment(ctrl.currentDeck.cards[next].toBeSeen).fromNow())]) //should be an overtime button.
      m.redraw()
      console.log("noMore ran")
    }

    ctrl.nextCard = function () {
      //this if condition should also check how many cards have been viewed this day vs max to be viewed (from settings).
      if(ctrl.currentDeck.cards.length <= ctrl.index +1 || 
        (moment().diff(ctrl.currentDeck.cards[ctrl.index +1].toBeSeen) < 0)
        ) {
        console.log(ctrl.currentDeck.cards.length <= ctrl.index +1 ? "hit last card" : "hit a card not ready to be shown");
        // console.log("Next card's toBeSeen timestamp is: " + ctrl.currentDeck.cards[ctrl.index+1].toBeSeen.fromNow());
        viewDeck.noMore();
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
          ctrl.back([
            m(".card.back.center-block", ctrl.currentCard.back),
            m('br'),
            m("input",{type:'button', onclick: m.withAttr("value", ctrl.rate), value:'Did not remember', title:"Press 0 to select"}),
            m("input",{type:'button', onclick: m.withAttr("value", ctrl.rate), value:'Hard', title:"Press 1 to select"}),
            m("input",{type:'button', onclick: m.withAttr("value", ctrl.rate), value:'Good', title:"Press 2 to select"}),
            m("input",{type:'button', onclick: m.withAttr("value", ctrl.rate), value:'Too Easy', title:"Press 3 to select"})
          ]);
          ctrl.show = true;
        }
        else {
          ctrl.show = false;
          ctrl.back([
            m('br'),
            m("input",{type:'button', onclick: ctrl.toggleBack, value:'Show Back', title:'Press spacebar to select'})
          ]);
          ctrl.front = m.prop(
            m(".card.front.center-block", ctrl.currentCard.front)
          )
        }
      }
    }

    if (moment().diff(ctrl.currentDeck.cards[0].toBeSeen) > 0) {
      ctrl.back = m.prop([
        m('br'),
        m("input",{type:'button', onclick: ctrl.toggleBack, value:'Show Back', title:'Press spacebar to select'})
      ]);
      ctrl.front = m.prop(
        m(".card.front.center-block", ctrl.currentCard.front)
      )
      // console.log("controller front and back set: " + ctrl.currentCard.front + " " + ctrl.currentCard.back)
    } else {
      ctrl.back = m.prop([m('br'),m("p","Next card ready to review: " + 
        moment(ctrl.currentCard.toBeSeen).format("MMM Do, YYYY hh:mm a") + 
        ", " + moment(ctrl.currentDeck.cards[ctrl.index].toBeSeen).fromNow())]
        ); //should be an overtime button.

      ctrl.front = m.prop(m('br'));
    }

  

  }
})()
