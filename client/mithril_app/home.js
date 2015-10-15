(function(){
  window.Home = {};

  Home.view = function(ctrl){
    //creates a button for every deck
    // console.log("logged in? " + localStorage.loggedIn)
    if ( !App.mindSeal || !App.mindSeal.decks ){
      return m("",
      [m("h2", "Sign up/Login to continue"),"\n",
        m("div", [
          m("label[for='username']", "Username:"),
          m("input[type='text'][id='username'][type='username']", {onchange: m.withAttr("value", ctrl.username)}),        ]),
        m("div", [
          m("label[for='password']", "Password:"),
          m("input[type='text'][id='password'][type='password']", {onchange: m.withAttr("value", ctrl.password)}),
        ]),
        m("div", [
          m('a',{href:"#/home/"}, 
            m("input[type='button'][value='Sign Up & Login!']",{onclick:ctrl.signUp} )
          ),
        m('a',{href:"#/home/"}, 
            m("input[type='button'][value='Login!']",{onclick:ctrl.login} )
          )
        ])
      ])
    } else {
      return m("div.container center-block",[
        m('br'),
        m("a[href='#/newDeck']", //m routing to a new deck view
            m("input[type='button']",{value:"New Deck"}) //need to call a function at all?
          ), //m creating a button before rendering deck links
        m("a[href='#/shared']", //m routing to a new deck view
          m("input[type='button']",{value:"See Shared Decks"}) //need to call a function at all?
        ), //m creating a button before rendering deck links
        m('br'),
        m('br'),
        m("p.lead",'Total cards studied: ' + App.mindSeal.userSettings.allTimeCounter),
        m("p.lead",'Cards studied today: ' + App.mindSeal.userSettings.todayCounter),
        m("", ctrl.mArray), 
      ]);      
    }
  }

  Home.controller = function(){
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
      ctrl.mArray = [m("h2", "Select a deck:")];
      for (var deck in App.mindSeal.decks){
        ctrl.mArray.push(
          m("a", {href:('#/deckDash/' + deck)}, 
            m("input[type='button']",{value:deck})
          ),
          m("p", 
            ((App.mindSeal.decks[deck].cards.length !== 0) ? 
            ("Next card ready to review: " + moment(App.mindSeal.decks[deck].cards[0].toBeSeen).format("MMM Do, YYYY hh:mm a") +
            ", " + moment(App.mindSeal.decks[deck].cards[0].toBeSeen).fromNow() ) : 
             "Deck is empty." )),
          m("p", "Number of cards in deck: " + App.mindSeal.decks[deck].cards.length),
          m("br")
        )
      }
    }
    else {
      ctrl.mArray = [(m("p.lead","Create or download a deck to get started."))];
    }
  }
})()
