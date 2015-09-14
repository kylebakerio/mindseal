
var viewDeck = {};

viewDeck.view = function(){
  // document.getElementById("see-decks").addClass("active")
  //^potentially different way of handling highlighting parts of the nav bar?
  
  return m(".container",[
    m('br'),
    m("a", {href:('#/deckDash/' + viewDeck.name)}, 
      m("input[type='button']",{value:("Back to " + viewDeck.name + "'s dashboard")})
    ),
    m(".starter-template", [
      m("h1", viewDeck.name),
      m('br'),
      m('strong','cards remaining in deck:'),m('br'),
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
  console.log(args.deck, args.name);
  viewDeck.currentDeck = m.prop(args.deck);
  viewDeck.index = 0;
  viewDeck.name = args.name;
  viewDeck.currentCard = m.prop(viewDeck.currentDeck().cards[viewDeck.index]);

  viewDeck.rate = function(button){
    var convert = {
      'Did not remember': viewDeck.currentCard().cScale[0],
      'Hard': viewDeck.currentCard().cScale[1],
      'Good': viewDeck.currentCard().cScale[2],
      'Too Easy': viewDeck.currentCard().cScale[3]
    }

    viewDeck.currentCard().tVal *= convert[button];
    viewDeck.currentCard().timeLastSeen = moment(); //it was just seen now.
    viewDeck.currentCard().toBeSeen = ( 
      viewDeck.currentCard().timeLastSeen.clone().add(viewDeck.currentCard().tVal, 'milliseconds') 
    );
    console.log("Days to next viewing: " + 
      moment.duration(viewDeck.currentCard().toBeSeen.diff(viewDeck.currentCard().timeLastSeen), 'milliseconds').asDays()
    );
    viewDeck.nextCard();
    viewDeck.showBack();
  }

  viewDeck.noMore = function(){
      viewDeck.front([m("h1.center-block", "Great work!"),m('p.lead','No more cards to view for now.')])
    viewDeck.back(m('br')) //should be an overtime button
    m.redraw()
    console.log("noMore ran")
  }

  viewDeck.nextCard = function () {
    if(viewDeck.currentDeck().cards.length <= viewDeck.index +1/* ||
       moment().diff(viewDeck.currentDeck()[viewDeck.index +1].toBeSeen)*/
      ) {
      viewDeck.noMore()
    }
    else {
      viewDeck.index++;
      viewDeck.currentCard(viewDeck.currentDeck().cards[viewDeck.index]);
    }
  }

  viewDeck.showBack = function(){
    if (viewDeck.show !== true){
      viewDeck.back([
        m(".card.back.center-block", viewDeck.currentCard().back),
        m('br'),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Did not remember', title:"Press 0 to select"}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Hard', title:"Press 1 to select"}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Good', title:"Press 2 to select"}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Too Easy', title:"Press 3 to select"})
      ])
      viewDeck.show = true;
    }
    else {
      viewDeck.show = false;
      viewDeck.back([
        m('br'),
        m("input",{type:'button', onclick: viewDeck.showBack, value:'Show Back', title:'Press spacebar to select'})
      ])
      viewDeck.front = m.prop(
        m(".card.front.center-block", viewDeck.currentCard().front)
      )
    }
  }

  viewDeck.back = m.prop([
    m('br'),
    m("input",{type:'button', onclick: viewDeck.showBack, value:'Show Back', title:'Press spacebar to select'})
  ])


  viewDeck.front = m.prop(
    m(".card.front.center-block", viewDeck.currentCard().front)
  )

}
