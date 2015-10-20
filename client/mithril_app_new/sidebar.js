(function(){
  window.Sidebar = {};

  Sidebar.view = function(ctrl){  
    return m("ul.side-nav.fixed.blue-grey.darken-1[id='slide-out']", [
      m("h3.center-align.logo", "mind:seal"),
      m("li[class='']", [m("a.nav-text[href='#/home']", "Home")]),
      m("li[class='']", [m("a.nav-text[href='#/settings']", "Settings")]),
      m("li[class='']", [m("a.nav-text[href='#/shared']", "Get Shared Decks")]),
      m("li[class='']", [m("a.nav-text[href='#/about']", "About")]),
      m("li[class='']", [m("a.nav-text[href='#/logout']", "Logout")])
    ])//,
    //m("a.button-collapse[data-activates='slide-out'][href='#']", [m("i.mdi-navigation-menu")])
  };

  Sidebar.controller = function(args){
    ctrl = this;

  };
})()

  // var active = m.prop("active");
  // var r = m.route();
  // var navTable = {
  //   "home": m.prop(),
  //   "settings": m.prop(),
  //   "#": m.prop(),
  //   "about": m.prop(),
  //   'logout': m.prop()
  // }
  // for (var key in navTable){
  //   if (r.split('/')[1] === key) navTable[key]("active")
  //   else navTable[key]("")
  // }
