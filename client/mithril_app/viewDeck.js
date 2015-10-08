
var viewDeck = {};

viewDeck.view = function(ctrl){
  // document.getElementById("see-decks").addClass("active")
  //^potentially different way of handling highlighting parts of the nav bar?
  return m(".container",[
    m('br'),
    m("a", {href:('#/deckDash/' + ctrl.name)}, 
      m("input[type='button']",{value:("Back to " + ctrl.name + "'s dashboard")})
    ),
    m(".starter-template", [
      m("h1", ctrl.name),
      m('br'),
      m('strong','cards remaining in deck: ' + viewDeck.remaining),
      m('br'),
      // m('strong','minutes studied today:'),m('br'), //would be nice.
      m('br'),
      m(".center-block", [
        viewDeck.front(),
        m('br'),
        viewDeck.back()
      ])
    ])
  ])
}

viewDeck.controller = function(args){

  var ctrl = this;
  ctrl.index = 0;
  ctrl.name = args.name;
  ctrl.deck = args.deck;
  viewDeck.currentDeck = args.deck;
  viewDeck.currentCard = viewDeck.currentDeck.cards[ctrl.index];
  viewDeck.show = false;
  viewDeck.remaining = viewDeck.currentDeck.cards.length-ctrl.index; //should be updated to take dates into account & should live update

  viewDeck.rate = function(button){
    var convert = {
      'Did not remember': viewDeck.currentCard.cScale[0],
      'Hard': viewDeck.currentCard.cScale[1],
      'Good': viewDeck.currentCard.cScale[2],
      'Too Easy': viewDeck.currentCard.cScale[3]
    }

    var tVal = moment.duration(moment().diff(moment(viewDeck.currentCard.timeLastSeen))).asMinute(s);
    console.log("tval is: " + tVal);

    console.log("convert[button] " + convert[button])
    console.log("old tval: " + viewDeck.currentCard.tVal);
    tVal *= convert[button]; 
    console.log("new tval: " + viewDeck.currentCard.tVal);
    console.log("old time last seen: " + viewDeck.currentCard.timeLastSeen);
    viewDeck.currentCard.timeLastSeen = moment().format(); //it was just seen now.
    console.log("new time last seen: " + viewDeck.currentCard.timeLastSeen);
    console.log("old time to be seen: " + viewDeck.currentCard.toBeSeen);
    viewDeck.currentCard.toBeSeen = ( 
      moment(viewDeck.currentCard.timeLastSeen).clone().add(tVal, 'milliseconds').format()
    );
    console.log("new time to be seen: " + viewDeck.currentCard.toBeSeen);
    console.log("Days to next viewing: " + 
      moment.duration(moment(viewDeck.currentCard.toBeSeen).diff(moment(viewDeck.currentCard.timeLastSeen))).asDays()
    );
    viewDeck.nextCard();
    viewDeck.toggleBack();
  }

  viewDeck.noMore = function(){
    viewDeck.front([m("h1.center-block", "Great work!"),m('p.lead','No more cards to view for now.')])
    viewDeck.back(m('br')) //should be an overtime button
    m.redraw()
    console.log("noMore ran")
    viewDeck.end = true;
  }

  viewDeck.nextCard = function () {
    console.log(viewDeck.currentDeck.cards[ctrl.index+1]);
    console.log(ctrl.index);
    if(viewDeck.currentDeck.cards.length <= ctrl.index +1 || 
      (moment().diff(viewDeck.currentDeck.cards[ctrl.index +1].toBeSeen) < 0)
      ) {
      console.log(viewDeck.currentDeck.cards.length <= ctrl.index +1 ? "ran out of cards" : "last card should not be shown");
      viewDeck.noMore();
    }
    else {
      ctrl.index++;
      Card.counter(); //keeps track of how many cards you've studied.
      viewDeck.currentCard = viewDeck.currentDeck.cards[ctrl.index];
    }
  }

  viewDeck.toggleBack = function(){
    if (viewDeck.end !== true) {
      if (ctrl.show !== true ){
        viewDeck.back([
          m(".card.back.center-block", viewDeck.currentCard.back),
          m('br'),
          m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Did not remember', title:"Press 0 to select"}),
          m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Hard', title:"Press 1 to select"}),
          m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Good', title:"Press 2 to select"}),
          m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Too Easy', title:"Press 3 to select"})
        ])
        ctrl.show = true;
      }
      else {
        ctrl.show = false;
        viewDeck.back([
          m('br'),
          m("input",{type:'button', onclick: viewDeck.toggleBack, value:'Show Back', title:'Press spacebar to select'})
        ])
        viewDeck.front = m.prop(
          m(".card.front.center-block", viewDeck.currentCard.front)
        )
      }
    }
  }

  viewDeck.back = m.prop([
    m('br'),
    m("input",{type:'button', onclick: viewDeck.toggleBack, value:'Show Back', title:'Press spacebar to select'})
  ])


  viewDeck.front = m.prop(
    m(".card.front.center-block", viewDeck.currentCard.front)
  )
  console.log("controller front and back set: " + viewDeck.currentCard.front + " " + viewDeck.currentCard.back)
}