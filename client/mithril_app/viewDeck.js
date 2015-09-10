var viewDeck = {};


viewDeck.stuff = function(){
  console.log("hi")
}

viewDeck.view = function(){

  // document.getElementById("see-decks").addClass("active")
  //^potentially different way of handling highlighting parts of the nav bar
  
  return m(".container",[
    m(".starter-template", [
      m("h1", "Let's look at cards!!!"),
      m("p.lead", ["wheeeeeee......!!!111!1!!!1337", m("br")," nullundefined."]),
      m(".center-block", [
        m(".card.front.center-block"/*, viewDeck.controller().currentCard().front*/), //maybe??
        m(".card.back.center-block", App.Decks()["mvp"][App.Decks()["mvp"].order[0]].back), //maybe??
        m("input",{type:'button', onclick: 'console.log("clicked")',value:'I remembered!!'}),
        m("input[type='button'][value='I did not remember'][onclick='ctrl.rate(false)']")
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
  console.log("loading deck: " + Home.selectedDeck)

  // currentCard(ctrl.deck[ctrl.orderArray[cardIndex]]);
  // console.log(currentCard)

  ctrl.nextCard = function () {
    ctrl.index++;
    ctrl.currentCard(deck[cardIndex]); //maybe?
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
