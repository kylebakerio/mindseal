var viewDeck = {};

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

viewDeck.view = function(){
  // document.getElementById("see-decks").addClass("active")
  //^potentially different way of handling highlighting parts of the nav bar?
  
  return m(".container",[
    m('br'),
    m("a", {href:('#/deckDash/' + viewDeck.name)}, 
      m("input[type='button']",{value:("Back to " + viewDeck.name + "'s dashboard")})
    ),
    m(".starter-template", [
      m('p', "you are studying:"),
      m("h1", viewDeck.name),
      m('strong','cards remaining in deck:'),m('br'),
      // m('strong','minutes studied today:'),m('br'), //would be nice.
      m('br'),
      m(".center-block", [
        m(".card.front.center-block", viewDeck.currentCard().front),
        m('br'),
        m("",viewDeck.back())
      ])
    ])
  ])
}

viewDeck.nextCard = function () {
  if(viewDeck.currentDeck().cards.length <= viewDeck.index +1/* ||
     moment().diff(viewDeck.currentDeck()[viewDeck.index +1].toBeSeen)*/
    ) {
    console.log("no more cards!")
    //should set the containing div to be equal to a 'no more cards to view' message.
    //with an overtime button.
  }

  //
  else {
    viewDeck.index++;
    viewDeck.currentCard(viewDeck.currentDeck().cards[viewDeck.index]);
  }
}

viewDeck.controller = function(args){
  var ctrl = this;
  console.log(args.deck, args.name);
  viewDeck.currentDeck = m.prop(args.deck);
  viewDeck.index = 0;
  viewDeck.name = args.name;
  viewDeck.currentCard = m.prop(viewDeck.currentDeck().cards[viewDeck.index]);
  viewDeck.showBack = function(){
    if (viewDeck.show !== 1){
      viewDeck.back([
        m(".card.back.center-block", viewDeck.currentCard().back),
        m('br'),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Did not remember'}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Hard'}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Good'}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Too Easy'})
      ])
      viewDeck.show = 1;
    }
    else {
      viewDeck.show = 0;
      viewDeck.back([
        m('br'),
        m("input",{type:'button', onclick: viewDeck.showBack, value:'Show Back'})
      ])
    }
  }

  viewDeck.back = m.prop([
    m('br'),
    m("input",{type:'button', onclick:viewDeck.showBack, value:'Show Back'})
  ])
  //should be called on every button press
  // ctrl.rate = function (flag) {
  //   var toRate /*= ctrl.contacts().splice(, 1);*/ //should be the card...
  //   m.request({
  //     method: 'POST',
  //     url: '/decks/' + options.deck,
  //     data: toRate
  //   });
  // //   var newModel = new Contacts.model()
  // //   ctrl.contacts().push(newModel)
  //   if (!ctrl.deck[cardIndex + 1].flag) //if the flag of the next card indicates it should be seen...
  //     ctrl.nextCard() //then run the next card function
  // }

}
