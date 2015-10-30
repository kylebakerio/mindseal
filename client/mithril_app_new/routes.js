var router = function(){  
  //setup routes to start w/ the `#` symbol
  m.route.mode = "hash";

  m.route(document.getElementById("SPA"), "/landing", {

    "/landing": {
      controller: function () {
        // needs testing to confirm works
        // as expected.
        if (typeof App === 'object') m.route("/home");
      },
      view: function (ctrl) {
        return m.component(Landing);
      }
    }, 

    "/home": {
      controller: function(){
        if (typeof App !== 'object') m.route("/landing");
      },
      view: function(ctrl,args,extras) {
        return ('.app', [
          m.component(Sidebar),
          m.component(Home)
        ])
      }
    },

    "/viewDeck/:deckId": {
      controller: function(){
        this.name = m.route.param('deckId');
        this.deck = Deck.find( this.name ); 
      },
      view: function(ctrl) {
        return m('.app', [
          m.component(Sidebar),
          m.component(viewDeck, { name: ctrl.name, deck: ctrl.deck })
        ])
      }
    },

    "/newDeck": {
      controller: function () {
        console.log("hi!")
      },
      view: function (ctrl) {
        return m('.app', [
          m.component(Sidebar, {}),
          m.component(newDeck, {})
        ]);
      }
    },

    "/settings": {
      controller: function(){
        alert("Coming soon!");
        m.route('/home');
      },
      view: function() {
        // return m('.app', [
        //   m.component(Sidebar),
        //   m.component(settings)
        // ])
      }
    },

    "/shared": {
      controller: function(){},
      view: function() {
        return m('.app', [
          m.component(Sidebar),
          m.component(shared)
        ])
      }
    },

    "/about": {
      // controller: function(){},
      view: function(ctrl) {
        return m('.app', [
          m.component(Sidebar),
          m.component(about)
        ])
      }
    },

    "/logout": {
      controller: function(){
        User.logout();
      },
      view: function(){
        // nothing gets loaded. User.logout()
        // redirects to #/landing.
      }
    }

  });
};