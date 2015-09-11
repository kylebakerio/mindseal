var viewDeck = {};

viewDeck.stuff = function(){
  console.log("hi")
}

viewDeck.memory = m.prop();

viewDeck.rate = function(button){
  var convert = {
    'Did not remember': .9,
    'Hard': 1.1,
    'Good': 1.4,
    'Too Easy': 1.8
  }

  viewDeck.currentCard().tVal *= convert[button];
  viewDeck.currentCard().timeLastSeen = "today" //needs moment.js
  viewDeck.currentCard().toBeSeen = "today" + viewDeck.currentCard().tVal //needs moment.js
  console.log(viewDeck.currentCard().tVal)
  viewDeck.nextCard()
}

viewDeck.view = function(){

  // document.getElementById("see-decks").addClass("active")
  //^potentially different way of handling highlighting parts of the nav bar?
  
  return m(".container",[
    m(".starter-template", [
      // m("h1", "Let's look at cards!!!"),
      // m("p.lead", ["wheeeeeee......!!!111!1!!!1337", m("br")," nullundefined."]),
      m(".center-block", [
        m(".card.front.center-block", viewDeck.currentCard().front),
        m('br'),
        m(".card.back.center-block", viewDeck.currentCard().back),
        m('br'),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Did not remember'}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Hard'}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Good'}),
        m("input",{type:'button', onclick: m.withAttr("value", viewDeck.rate), value:'Too Easy'}),
      ])
    ])
  ])
}

viewDeck.controller = function(){

  viewDeck.currentDeck = App.Decks()[Home.selDeck];
  viewDeck.index = 0
  viewDeck.order = App.Decks()[Home.selDeck].order;
  viewDeck.currentCard = m.prop();
  viewDeck.currentCard(viewDeck.currentDeck[viewDeck.order[viewDeck.index]])

  var ctrl = this;
  console.log("loading deck: " + Home.selDeck)

  // currentCard(ctrl.deck[ctrl.orderArray[cardIndex]]);
  // console.log(currentCard)

  viewDeck.nextCard = function () {
    if (viewDeck.currentDeck.order.length > viewDeck.index +1) {
      viewDeck.index++;
      viewDeck.currentCard(viewDeck.currentDeck[viewDeck.order[viewDeck.index]]);
    }
  }

  //should be called on every button press
  ctrl.rate = function (flag) {
    var toRate /*= ctrl.contacts().splice(, 1);*/ //should be the card...
    m.request({
      method: 'POST',
      url: '/decks/' + options.deck,
      data: toRate
    });
  //   var newModel = new Contacts.model()
  //   ctrl.contacts().push(newModel)
    if (!ctrl.deck[cardIndex + 1].flag) //if the flag of the next card indicates it should be seen...
      ctrl.nextCard() //then run the next card function
  }

}
