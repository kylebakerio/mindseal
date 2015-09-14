
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
  viewDeck.currentDeck = m.prop(args.deck);
  viewDeck.currentCard = m.prop(viewDeck.currentDeck().cards[ctrl.index]);
  viewDeck.show = false;
  viewDeck.remaining = viewDeck.currentDeck().cards.length-ctrl.index; //should be updated to take dates into account & should live update

  viewDeck.rate = function(button){
    var convert = {
      'Did not remember': viewDeck.currentCard().cScale[0],
      'Hard': viewDeck.currentCard().cScale[1],
      'Good': viewDeck.currentCard().cScale[2],
      'Too Easy': viewDeck.currentCard().cScale[3]
    }

    console.log(convert[button])
    viewDeck.currentCard().tVal *= convert[button]; 
    viewDeck.currentCard().timeLastSeen = moment(); //it was just seen now.
    viewDeck.currentCard().toBeSeen = ( 
      viewDeck.currentCard().timeLastSeen.clone().add(viewDeck.currentCard().tVal, 'milliseconds') 
    );
    console.log("Days to next viewing: " + 
      moment.duration(viewDeck.currentCard().toBeSeen.diff(viewDeck.currentCard().timeLastSeen), 'milliseconds').asDays()
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
    if(viewDeck.currentDeck().cards.length <= ctrl.index +1/* ||
       moment().diff(viewDeck.currentDeck()[ctrl.index +1].toBeSeen)*/
      ) {
      viewDeck.noMore()
    }
    else {
      ctrl.index++;
      Card.counter(); //keeps track of how many cards you've studied.
      viewDeck.currentCard(viewDeck.currentDeck().cards[ctrl.index]);
    }
  }

  viewDeck.toggleBack = function(){
    if (viewDeck.end !== true) {
      if (ctrl.show !== true ){
        console.log("it's false!")
        viewDeck.back([
          m(".card.back.center-block", viewDeck.currentCard().back),
          m('br'),
          m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Did not remember', title:"Press 0 to select"}),
          m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Hard', title:"Press 1 to select"}),
          m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Good', title:"Press 2 to select"}),
          m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Too Easy', title:"Press 3 to select"})
        ])
        ctrl.show = true;
      }
      else {
        console.log("it's true!")
        ctrl.show = false;
        viewDeck.back([
          m('br'),
          m("input",{type:'button', onclick: viewDeck.toggleBack, value:'Show Back', title:'Press spacebar to select'})
        ])
        viewDeck.front = m.prop(
          m(".card.front.center-block", viewDeck.currentCard().front)
        )
      }
    }
  }

  viewDeck.back = m.prop([
    m('br'),
    m("input",{type:'button', onclick: viewDeck.toggleBack, value:'Show Back', title:'Press spacebar to select'})
  ])


  viewDeck.front = m.prop(
    m(".card.front.center-block", viewDeck.currentCard().front)
  )
}