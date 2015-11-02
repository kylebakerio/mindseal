(function(){
  window.newDeck = {};
  newDeck.view = function(ctrl){
    return m(".cow.col.s12", [
      m(".row", [
        m(".col.s12.m7.l7.offset-l3.offset-m2", [
          m(".card.blue-grey.darken-1", [
            m(".card-content.white-text", [
              m("span.card-title", "New Deck"),
              // m("p", ["Default difficulty for new cards in this deck: ",
              //   m("br")
              // ]),
              // m("p.range-field", [
              //   m("input[id='test5'][max='100'][min='0'][type='range']")
              // ]),
              m("p"),
              m(".row", [
                m(".input-field.col.s6", [
                  m("input[id='input_text'][length='30'][type='text']",{onchange: m.withAttr("value", ctrl.nameTxt)}),
                  m("label[for='input_text']", "Deck Name")
                ])
              ]),
              m(".row", [
                m(".input-field.col.s12", [
                  m("textarea.materialize-textarea[id='textarea1'][length='300']"),
                  m("label[for='textarea1']", "Deck Description")
                ])
              ])
            ]),
            m(".card-action", [
              m("a.waves-effect.waves-light.btn", {onclick:ctrl.makeDeck}, [m("i.material-icons.left", "add_box"),"Make New Deck"])
            ])
          ])
        ])
      ])
    ])
  };

  newDeck.controller = function(){
    var ctrl = this;
    ctrl = this;
    ctrl.nameTxt = m.prop();
    ctrl.makeDeck = function(){ //populates the values of the card from the form and calls the view
      var deck = {name:ctrl.nameTxt(), description:$("#textarea1").val()};
      Deck.createDeck(deck.name, deck);
      $("#input_text").val(""); //is this a bad pattern to use with mithril?
      $("#textarea1").val("");
      Materialize.toast('Deck "' + deck.name + '" Added', 4000);
      m.route('/home');
    };
  };
})()

