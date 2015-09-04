App = {};

App.view = function(){
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
            m("li.active", [m("a[href='/addCards/1']", "Add Cards")]),
            m("li", [m("a[href='#/viewDeck/1']", "See Deck")]),
            m("li", [m("a[href='#']", "About")])
          ])
        ])
      ])
    ])//,
    // m("div[id='views']")
  ])
}

App.controller = function(){
  
}


//setup routes to start w/ the `#` symbol
m.route.mode = "hash";

// ROUTING is not yet working:
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