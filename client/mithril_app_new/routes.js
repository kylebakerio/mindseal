var router = function(){  
  console.log("declaring router")
  //setup routes to start w/ the `#` symbol
  m.route.mode = "hash";

  m.route(document.getElementById("SPA"), "/landing", {

    "/landing": {
      controller: function () {
        console.log("routed to landing")
        console.log("localStorage.mindSeal=", localStorage.mindSeal)
        // needs testing to confirm works
        // as expected.
        if (localStorage.mindSeal !== "false") {
          console.log("routing home")
          m.route("/home");
        }
      },
      view: function (ctrl) {
        return m.component(Landing);
      }
    }, 

    "/home": {
      controller: function(){
        console.log("routed to home")
        console.log("localStorage.mindSeal=", localStorage.mindSeal)
        if (localStorage.mindSeal === "false") {
          m.route("/landing");
        }
      },
      view: function(ctrl,args,extras) {
        return m('.app', [
          m.component(Sidebar),
          m.component(Home)
        ])
      }
    },

    "/viewDeck/:deckId": {
      controller: function(){
        console.log("routed to viewDeck")
        console.log("localStorage.mindSeal=", localStorage.mindSeal)
        if (localStorage.mindSeal === "false") m.route("/landing");
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
        console.log("routed to newDeck")
        console.log("localStorage.mindSeal=", localStorage.mindSeal)
        if (localStorage.mindSeal === "false") m.route("/landing");
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
      controller: function(){
        console.log("routed to shared")
        console.log("localStorage.mindSeal=", localStorage.mindSeal)
        if (localStorage.mindSeal === "false") m.route("/landing");
      },
      view: function() {
        return m('.app', [
          m.component(Sidebar),
          m.component(shared)
        ])
      }
    },

    "/about": {
      controller: function(){
         m.route("/home");
      },
      view: function(ctrl) {
        return m('.app', [
          m.component(Sidebar),
          m.component(about)
        ])
      }
    },

    "/logout": {
      controller: function(){
        console.log("routed to logout")
        console.log("localStorage.mindSeal=", localStorage.mindSeal)
        if (localStorage.mindSeal === "false") m.route("/landing");
        else User.logout();
        console.log("post logout:", localStorage.mindSeal)
      },
      view: function(){
        // nothing gets loaded. User.logout()
        // redirects to #/landing.
      }
    }

  });
};