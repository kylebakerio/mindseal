(function(){
  window.Sidebar = {};

  Sidebar.view = function(ctrl){  
    return m("",[
      m("ul.side-nav.fixed.blue-grey.darken-1[id='slide-out']", [
        m("h3.center-align.logo", "mind:seal"),
        m("li[class='username']", [m("a.nav-text", "User: "+App.mindSeal.userSettings.username)]), //make non hoverable... center, stylize larger
        m("li[class='sidebar-text']", [m("a.nav-text[href='#/home']", "Home")]),
        // m("li[class='sidebar-text']", [m("a.nav-text[href='#/settings']", "Settings")]),
        m("li[class='sidebar-text']", [m("a.nav-text[href='#/newDeck']", "Create New Deck")]),
        m("li[class='sidebar-text']", [m("a.nav-text[href='#/shared']", "Get Shared Decks")]),
        // m("li[class='sidebar-text']", [m("a.nav-text[href='#/about']", "About")]),
        m("li[class='sidebar-text']", [m("a.nav-text[href='#/logout']", "Logout")]),
      ]),
      m("a.center-align", {onclick:function(){console.log("state:",window.menuState);ctrl.toggleMenu()}},[m("i.s1.col.offset-s11.mdi-navigation-menu")])
    ])
  };

  Sidebar.controller = function(args){
    ctrl = this;
    window.menuState = window.innerWidth < 1000 ? 'hidden' : 'shown';
    console.log("ctrl.menuSate = " + window.menuState)
    ctrl.toggleMenu = function(){
      console.log("window.menuState:",window.menuState)
      if (window.menuState === 'hidden'){
        console.log("trying to show")
        window.menuState = 'shown';
        $('.side-nav.fixed').animate({
          left: 0
        }, 500);
        $('i.mdi-navigation-menu').animate({
          'padding-left': 240
        }, 700);
      }
      else if (window.menuState === 'shown'){
        console.log("trying to hide")
        window.menuState = 'hidden';
        $('.side-nav.fixed').animate({
          left: '-105%'
        }, 500);
        $('i.mdi-navigation-menu').animate({
          'padding-left': 0
        }, 400);
      }
      else {
        console.log("hit nothing, window.menuState:",window.menuState)
      }
    }
  };
})()

//User.sync()

  // var active = m.prop("active-sidebar");
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
