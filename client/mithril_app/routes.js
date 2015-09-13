
//setup routes to start w/ the `#` symbol
m.route.mode = "hash";

m.route(document.getElementById("views"), "/", {

  "/": {
    controller: function(){
      Home.controller
    },

    view: function(ctrl,args,extras) {
      console.log("root view fn() was run")
      return ('.app', [
        m.component(App),
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
        m.component(App),
        m.component(viewDeck, { name: ctrl.name, deck: ctrl.deck })
      ])
    }
  },

  "/addCards/:deckId": {
    controller: function () {
      this.deck = Deck.find( m.route.param('deckId') );
    },
    view: function (ctrl) {
      return m('.app', [
        m.component(App),
        m.component(addCards, { deck: ctrl.deck })
      ]);
    }
  },

  "/deckDash/:deckId": {
    controller: function(){
      this.name = m.route.param('deckId');
      this.deck = Deck.find( this.name );
    },
    view: function(ctrl) {
      return m('.app', [
        m.component(App),
        m.component(deckDash, { name: ctrl.name, deck: ctrl.deck })
      ])
    }
  },

  "/settings": {
    // controller: function(){},
    view: function() {
      return m('.app', [
        m.component(App),
        m.component(settings)
      ])
    }
  },

  "/about": {
    // controller: function(){},
    view: function() {
      return m('.app', [
        m.component(App),
        m.component(about)
      ])
    }
  },

});

////some reference:
// var viewDeck = {
//   controller: function() {
//       return {id: m.route.param("deckID")};
//   },
//   view: function(controller) {
//       return m("div", controller().id);
//   }
// }
