var Home = {};
console.log("home.js was loaded")

Home.stuff = function(deck){
  //this is where the routing from line 18 should happen, I think.
  Home.selDeck = deck;
}

Home.selDeck = "";

Home.view = function(){
  console.log("Home.view was run")
  
  //creates a button for every deck
  var mArray = [];
  for (var deck in App.Decks()){
    mArray.push(
      m("a", {href:('#/viewDeck/' + deck)}, 
        m("input[type='button']",{onclick:m.withAttr("value", Home.stuff), value:deck})
      ),
      m("br"),
      m("br")
    )
  }

  return m("",[
    m("p", "Select a deck:"),
    m("", mArray), //renders our buttons
    m("p", "Your selected deck: " + Home.selDeck )//,
  ]);
}

Home.controller = function(){
  console.log("in Home.controller, calling Deck.fetch()...");
  App.Decks = m.prop();
  Deck.fetch();
  App.Decks(window.localStorage.get(mindSeal_userDecks)); 
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
