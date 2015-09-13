
var addCards = {};

addCards.makeCard = function(){ //populates the values of the card from the form and calls the view
  var newCard = {}
  newCard.front = this.frontTxt();
  newCard.back = this.backTxt();
  console.log(newCard.front, " :text value fetched from dom");
  console.log(newCard.back, " :back text value fetched from dom");

  //m add algo fields (default values) in here? 
  console.log(addCards.name)
  Card.setCard(Card.vm(newCard),addCards.deck);
}
//picks up the text from the input field it's called from
addCards.frontTxt = m.prop(); 
addCards.backTxt = m.prop();

addCards.view = function(){
  return m('br'),
      m(".container", [
      m('br'),
      m("a", {href:('#/deckDash/' + addCards.name)}, 
        m("input[type='button']",{value:("Back to " + addCards.name + "'s dashboard")})
      ),
      m(".starter-template", [
        m("h1", "CODENAME: IGGY"),
        m("p.lead", ["Let's make some cards.",
          m("br")," So you can remember stuff."]),
        m('p','Size of your deck: ' + addCards.deck.cards.length),
        m("input[type='text'][class='newFront']", {onchange: m.withAttr("value", addCards.frontTxt)}), //m
        m("br"),
        m("input[type='text'][class='newBack']", {onchange: m.withAttr("value", addCards.backTxt)}),
        m("br"),
        m("input[type='button'][value='make a card!']",
          {onclick:this.makeCard.bind(this)}
          )
      ])
    ])
}

addCards.controller = function(args){
  var ctrl = this;
  addCards.name = args.name;
  addCards.deck = args.deck;

  // ctrl.contacts = m.prop( [new Contacts.model()] );

  ctrl.update = function(index) {
    var toUpdate = ctrl.contacts()[index];
    m.request({
      method: 'POST',
      url: '/decks/' + options.deck,
      data: toUpdate
    })
    .then(function(updatedCard) {
      ctrl.cards()[index] = updatedCard;
    })
  }
}
