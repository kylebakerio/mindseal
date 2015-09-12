var addCards = {};

addCards.makeCard = function(front, back){
  var newCard = {}

  newCard.front = front;
  newCard.back = back;
  //add other algo fields in here?

  Card.vm(newCard)
}

addCards.frontTxt = m.prop(); //m picks up the text from the input field it's called from
addCards.backTxt = m.prop(); //m 

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
          {onclick:this.addCards.makeCard.bind(this)} //m change: send both values 
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
why specific deck fails on page refresh? Needs router handling or some data was being passed 
to it from the home page that broke on refresh.

*/


