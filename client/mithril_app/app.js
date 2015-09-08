App = {};

//the context in which all other sub pages are displayed within:
App.view = function(){

  var active = m.prop("active");
  var r = m.route();
  var navTable = {
    "viewDeck": m.prop(),
    "addCards": m.prop(),
    "#": m.prop(),
    "about": m.prop()
  }

  for (var key in navTable){
    if (r.split('/')[1] === key) navTable[key]("active")
    else navTable[key]("")
  }

  return m("",
    [m("nav.navbar.navbar-inverse.navbar-fixed-top", [
      m(".container", [
        m(".navbar-header", [
          m("button.navbar-toggle.collapsed[aria-controls='navbar'][aria-expanded='false'][data-target='#navbar'][data-toggle='collapse'][type='button']", [
            m("span.sr-only", "Toggle navigation"),
            m("span.icon-bar"),
            m("span.icon-bar"),
            m("span.icon-bar")
          ]),
          m("a.navbar-brand[href='#']", "Mind Seal")
        ]),
        m(".collapse.navbar-collapse[id='navbar']", [
          m("ul.nav.navbar-nav", [
            m("li", {class: navTable["addCards"]()},[m("a[href='#/addCards/1']", "Add Cards")]),
            m("li", {class: navTable["viewDeck"]()},[m("a[href='#/viewDeck/1']", "See Deck")]),
            m("li", {class: navTable["about"]()},[m("a[href='#']", "About")])
          ])
        ])
      ])
    ]),
    m("div[id='views']")
  ])
}

App.controller = function(){
  App.userDecks = m.prop({});
  //need to figure out how to pass information from one view to the other?

  m.request(method:"GET", url: "/decks") //will need to form request with user ID 
  .then(function(error, data){
    App.userDecks = data;
  })
   //should now be stored in App.controller.
  
  //should handle (non routing) button press functionality
}


//setup routes to start w/ the `#` symbol
m.route.mode = "hash";

m.route(document.getElementById("views"), "/", {
  "/": Home,
  "/addCards/:deckID": addCards,
  "/viewDeck/:deckID": viewDeck
});

// var viewDeck = {
//   controller: function() {
//       return {id: m.route.param("deckID")};
//   },
//   view: function(controller) {
//       return m("div", controller.id);
//   }
// }

// //define a route
// m.route(document.body, "/viewDeck/:deckID", {
//   "/viewDeck/:deckID": viewDeck
// });