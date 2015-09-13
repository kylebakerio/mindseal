App = {};

// used throughout the app as the locally modifiable copy of the localstorage JSON version.
App.Decks = m.prop(localStorage.getObject('mindSeal').decks);

// specifies the navbar.
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
          m("button.navbar-toggle.collapsed[aria-controls='navbar']\
            [aria-expanded='false'][data-target='#navbar']\
            [data-toggle='collapse'][type='button']", [
            m("span.sr-only", "Toggle navigation"),
            m("span.icon-bar"),
            m("span.icon-bar"),
            m("span.icon-bar")
          ]),
          m("a.navbar-brand[href='#']", "Mind Seal")
        ]),
        m(".collapse.navbar-collapse[id='navbar']", [
          m("ul.nav.navbar-nav", [
            // m("li", {class: navTable["addCards"]()},[m("a[href='#/addCards/" + Home.selDeck + "']", "Add Cards")]),
            // m("li", {class: navTable["viewDeck"]()},[m("a[href='#/viewDeck/" + Home.selDeck + "']", "View Deck")]),
            m("li", {class: navTable["home"]()},[m("a[href='#/settings']", "Home")]),
            m("li", {class: navTable["settings"]()},[m("a[href='#/settings']", "Settings")]),
            m("li", {class: navTable["about"]()},[m("a[href='#/about']", "About")])
          ])
        ])
      ])
    ]),
    m("div[id='views']")
  ])
}

App.controller = function(){
  console.log("in Home.controller, calling Deck.sync()...");
  Deck.sync();
}

function getToken(callback) {
  // Use this function to either sign in for the first time or grab the current token from Chrome.
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      return;
    }
    callback(token);
  });
}
