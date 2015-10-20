(function(){
  window.Home = {};

  Home.view = function(ctrl){  
    return m(".cow.col.s12", [
      m(".row", [
        m(".col.s12.m7.l7.offset-l3.offset-m2", [
          m("h2", "Welcome!"),
          m("p", ["You have ",m("b", "todo")," cards to go to meet your daily quota."]),
          m("p", ["You've reviewed ",m("b", "todo")," cards today."]),
          m("p", ["You have ",m("b", "todo cards ready to review.")," "]),
          m("p", ["You've reviewed ",m("b", "todo")," cards since 3 months ago."])
        ])
      ]),
      /*m(".row", [
        m(".col.s9.offset-s1", [
          m(".divider.col.s6.offset-s3")
        ])
      ]),*/

      ctrl.mArray,


      // m(".row", [
      //   m(".col.s12.m7.l7.offset-l3.offset-m2", [
      //     m(".card.blue-grey.darken-1", [
      //       m(".card-content.white-text", [
      //         m("span.card-title", "Javascript"),
      //         m("p", ["\n                  Cards to be seen: 20",m("br"),"\n                  Size of deck: 223",m("br"),"\n                  Next card ready to review: 10 hours ago\n                "])
      //       ]),
      //       m(".card-action", [
      //         m("a.waves-effect.waves-light.btn[href='http://localhost:6060/test4.html']", [m("i.material-icons.left", "grade"),"Review"]),
      //         m("a.waves-effect.waves-light.btn", [m("i.material-icons.left", "library_add"),"Add Cards"]),
      //         m("a.waves-effect.waves-light.btn", [m("i.material-icons.left.large.material-icons", "settings"),"Options"]),
      //         m("a.waves-effect.waves-light.btn", [m("i.material-icons.left", "call_split"),"Share"])
      //       ])
      //     ])
      //   ])
      // ]),
      
      m(".row", [
        m(".col.s12.m7.l7.offset-l3.offset-m2", [
          m(".card.blue-grey.darken-1", [
            m(".card-content.white-text", [
              m("span.card-title", "New Deck"),
              m("p", [
                "\n                  Default difficulty for new cards in this deck: ",
                m("br")
              ]),
              m("p.range-field", [
                m("input[id='test5'][max='100'][min='0'][type='range']")
              ]),
              m("p"),
              m(".row", [
                m(".input-field.col.s6", [
                  m("input[id='input_text'][length='30'][type='text']"),
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
              m("a.waves-effect.waves-light.btn", [m("i.material-icons.left", "add_box"),"Make New Deck"])
            ])
          ])
        ])
      ])
    ])
  };

  Home.controller = function(args){
    console.log("in home controller")
    ctrl = this;

    ctrl.username = m.prop();
    ctrl.password = m.prop();
    ctrl.signUp = function(){
      User.signUp(ctrl.username(), ctrl.password())
    }
    ctrl.login = function(){
      User.login(ctrl.username(), ctrl.password())
    }
    
    if (App.mindSeal && App.mindSeal.decks && Object.keys(App.mindSeal.decks).length !== 0){
      ctrl.mArray = [];
      for (var deck in App.mindSeal.decks){
        ctrl.mArray.push(
          
          m(".row", [
            m(".col.s12.m7.l7.offset-l3.offset-m2", [
              m(".card.blue-grey.darken-1", [
                m(".card-content.white-text", [
                  m("span.card-title", deck),
                  m("p", ["Cards to be seen: todo",m("br"),"Size of deck: "+ 
                    App.mindSeal.decks[deck].cards.length, m("br"), 

                    ((App.mindSeal.decks[deck].cards.length !== 0) ? 
                    ("Next card ready to review: " + moment(App.mindSeal.decks[deck].cards[0].toBeSeen).format("MMM Do, YYYY hh:mm a") +
                    ", " + moment(App.mindSeal.decks[deck].cards[0].toBeSeen).fromNow() ) : 
                     "Deck is empty.")
                  ])
                ]),
                m(".card-action", [
                  m("a.waves-effect.waves-light.btn", {href:('#/viewDeck/' + deck)}, [m("i.material-icons.left", "grade"),"Review"]),
                  m("a.waves-effect.waves-light.btn", [m("i.material-icons.left", "library_add"),"Add Cards"]),
                  m("a.waves-effect.waves-light.btn", [m("i.material-icons.left.large.material-icons", "settings"),"Options"]),
                  m("a.waves-effect.waves-light.btn", [m("i.material-icons.left", "call_split"),"Share"])
                ])
              ])
            ])
          ])

        )

      }
    }
    else {
      ctrl.mArray = [(m("p.lead","Create or download a deck to get started."))];
    }
    
  };


  Home.addCardsDemo = m(".row", [
        m(".col.s12.m7.l7.offset-l3.offset-m2", [
          m(".card.blue-grey.darken-1", [
            m(".card-content.white-text", [
              m("span.card-title", "Spanish"),
              m("p", ["\n                  Cards to be seen: 0",m("br"),"\n                  Size of deck: 223",m("br"),"\n                  Next card ready to review: in 2 days\n                "]),
              m(".row", [
                m(".input-field.col.s12.m6", [
                  m("input.materialize-textarea[id='Spanish-Front'][type='text']"),
                  m("label", "Card Front")
                ]),
                m(".input-field.col.s12.m6", [
                  m("input.materialize-textarea[id='Spanish-Back'][type='text']"),
                  m("label", "Card Back")
                ])
              ]),
              m("a.btn-floating.waves-effect.waves-light.blue[onclick='Materialize.toast(\'Card Added!\', 4000)']", [m("i.material-icons", "add")])
            ]),
            m(".card-action", [
              m("a.waves-effect.waves-light.btn.blue", [m("i.material-icons.left", "done_all"),"Finished"])
            ])
          ])
        ])
      ])

})()
