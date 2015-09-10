var Home = {};
console.log("home.js was loaded")

Home.stuff = function(deck){
  Home.selDeck = deck;
}

Home.selDeck = "";

Home.view = function(){
  console.log("Home.view was run")
  
  //creates a button for every deck
  var mArray = [];
  for (var deck in App.Decks()){
    mArray.push(
      m("input[type='button']",{onclick:m.withAttr("value", Home.stuff), value:deck}),
      m("br"),
      m("br")
    )
  }

  return m("",[
    m("p", "Select a deck:"),
    m("",mArray), //renders our buttons
    m("p", "Your selected deck: " + Home.selDeck )//,
    // m("p", decksArray)
  ]);
}

Home.controller = function(){
  console.log("calling Deck.fetch()...")
  App.Decks = m.prop();
  App.Decks(Deck.fetch());
  // console.log("/ controller: App.Decks is (next line): ");
  // console.log(App.Decks);

  var ctrl = this;
  console.log("Home.controller was run")
  // ctrl.login = function(username, password){
  //   m.request({ 
  //     method: 'GET',
  //     url: '/users', //authentication will be very different.
  //     data: username
  //   }) //logged in, so:
  //   .then( function(username){
  //       App.getDecks(username);
  //     }
  //   )
  //   //needs error handling for failed login attempt
  // }
  // return ctrl;
}
