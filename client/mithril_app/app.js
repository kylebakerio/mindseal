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
            m("li.active", [m("a[href='#/addCards']", "Add Cards")]),
            m("li", [m("a[href='#/viewDeck']", "See Deck")]),
            m("li", [m("a[href='#']", "About")])
          ])
        ])
      ])
    ])
  ])
}

App.controller = function(){
  
}

//
// ROUTING is not yet working:

// m.route(document.body, "/", {
//   "/": App,
//   "/addCards": addCards,
//   "/viewDeck": viewDeck
// });

// var viewDeck = {
//   controller: function() {
//       return {id: m.route.param("deckID")};
//   },
//   view: function(controller) {
//       return m("div", controller.id);
//   }
// }

// //setup routes to start w/ the `#` symbol
// m.route.mode = "hash";

// //define a route
// m.route(document.body, "/viewDeck/johndoe", {
//   "/viewDeck/:deckID": viewDeck
// });