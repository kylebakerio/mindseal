var Home = {};

Home.view = function(){
  //creates a button for every deck
  var mArray = [];
  for (var deck in App.mindSeal().decks){
    mArray.push(
      m("a", {href:('#/deckDash/' + deck)}, 
        m("input[type='button']",{value:deck})
      ),
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
    // m("p", "Some basic user stats would look great here. Especially any kind of visualization."),
    m('strong','cards studied today: ' + App.mindSeal().userSettings.todayCounter),m('br'),m('br'),
    m("h2", "Select a deck:"),
    m("", mArray), 
  ]);
}

Home.controller = function(){

}

