
var addCards = {};

addCards.makeCard = function(){ //populates the values of the card from the form and calls the view
  var newCard = {}

  newCard.front = this.frontTxt();
  console.log(newCard.front, " :text value fetched from dom");
  newCard.back = this.backTxt();
  console.log(newCard.back, " :back text value fetched from dom");

  //save to a deck variable
  Card.setCard(Card.vm(newCard));

}

addCards.frontTxt = m.prop(); //m picks up the text from the input field it's called from
addCards.backTxt = m.prop();

addCards.view = function(){
  return m(".container", [
      m(".starter-template", [
        m("h1", "CODENAME: IGGY"),
        m("p.lead", ["Let's make some cards.",
          m("br")," So you can remember stuff."]),
        m("input[type='text'][class='newFront']", {onchange: m.withAttr("value", addCards.frontTxt)}), //m
        m("br"),
        m("input[type='text'][class='newBack']", {onchange: m.withAttr("value", addCards.backTxt)}), //m 
        m("br"),
        m("input[type='button'][value='make a card!']",
          {onclick:this.makeCard.bind(this)} //m change: send both values 
          )
      ])
    ])
}

addCards.controller = function(){
  var ctrl = this;

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
/*

Misc tests, things to figure out:
why page refresh fails on specific deck? Needs router handling or some data was being passed 
to it from the home page that broke on refresh.

Can't find the cards script. Where are these included in the landing script?
Put before the addcard script. 
*/


