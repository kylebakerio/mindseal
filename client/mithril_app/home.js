(function(){
  window.Home = {};

  Home.view = function(ctrl){
    //creates a button for every deck
    var mArray = [];
    for (var deck in App.mindSeal.decks){
      mArray.push(
        m("a", {href:('#/deckDash/' + deck)}, 
          m("input[type='button']",{value:deck})
        ),
        m("p","Next card ready to review: " + 
          moment(App.mindSeal.decks[deck].cards[0].toBeSeen).format("MMM Do, YYYY hh:mm a") + 
          ", " + moment(App.mindSeal.decks[deck].cards[0].toBeSeen).fromNow()),
        m("br"),
        m("br")
      )
    }

    return m("div.container center-block",[
      m('br'),
      m("a[href='#/newDeck']", //m routing to a new deck view
          m("input[type='button']",{value:"New Deck"}) //need to call a function at all?
        ), //m creating a button before rendering deck links
      m('br'),
      m('br'),
      m("p.lead",'Total cards studied: ' + App.mindSeal.userSettings.allTimeCounter),
      m("p.lead",'Cards studied today: ' + App.mindSeal.userSettings.todayCounter),
      m("h2", "Select a deck:"),
      m("", mArray), 
    ]);
  }

  Home.controller = function(){
    ctrl = this;
  }
})()
