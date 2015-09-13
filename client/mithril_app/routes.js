
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

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
        m.component(App, { /*decks: App.Decks(), content: ctrl.content */}),
        m.component(Home, {})
      ])
    }
  },

  "/viewDeck/:deckId": {
    controller: function(){
      this.deck = Deck.find( m.route.param('deckId')/*.slice(1)*/ ) //grabs an individual deck from the Decks object
      console.log("this.deck is " + this.deck)
    },
    view: function(ctrl) {
      console.log("selected deck: " + Home.selDeck)
      return m('.app', [
        m.component(App, {}),
        m.component(viewDeck, { currDeck: Home.selDeck, currDeck2: ctrl.deck })
      ])
    }
  },

  "/addCards/:deckId": {
    controller: function () {
      this.deck = Deck.find( m.route.param('deckId') ); //grabs an individual deck from the Decks object
      // Previous line is equivalent to something like this:
      // this.deck = m.request({ method: 'GET', url: '/api/decks/10' })
      console.log(this.deck, " <-- if this is { order: [], uk: {} [etc...] }, Deck.find is working properly.")
    },
    view: function (ctrl) {
      return m('.app', [
        m.component(App, {}),
        m.component(addCards, { deck: App.Decks() })
      ]);
    }
  }

});

// add routes for the home(mindseal) view, settings and about


////some reference:
// var viewDeck = {
//   controller: function() {
//       return {id: m.route.param("deckID")};
//   },
//   view: function(controller) {
//       return m("div", controller().id);
//   }
// }
