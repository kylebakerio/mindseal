Deck = {};

// App.newDeck = new Deck();
// App.newDeck.addCard(/*new card model*/)

Deck.vm = function(){ // template for a new deck
  return {
    cards:[],
    addCard: function(){}
  }
}

//maybe refresh with server or fetch from local storage
Deck.fetch = function() { //should be the server call to get a Decks object
  // return m.request({
  //   method: 'GET', 
  //   url: '/decks/'//,
  //   // data: session token
  // })
}

Deck.sync = function() {
  //Uncaught ReferenceError: Deck is not defined App.js 53. temp fix below, untill correct data in db
  return 1;
  //step1: A GET request to make sure the client and server are synched up

  var xhrConfig = function(xhr) {
    getToken(function(token){
      
      xhr.setRequestHeader("api-token", token); //test user is 'mvp_tester', if bypassing auth
    })
  }
    var dbData = m.request({
                  method: 'GET',
                  url: '/decks',
                  config: xhrConfig,
                })
                .then(function(data){
                  console.log("data recieved from server below: ");
                  console.log(data); 
                  return data;
                })

  //step2: Compare timestamps
  //Kyle TODO: add moment.js function to compare
  if (dbData.userSettings.lastEdit > localStorage.getObject('mindSeal').userSettings.lastEdit) {
    //step3: Either keep fetched data (refresh localStorage)
    //make sure the format is the same as db
    if(prompt("It appears there are remote changes that need to be synced with your machine.\
      do you want to update your local data with the remote data? You could lose all of your cards.\
      type 'yes' to continue.") === 'yes'){
        localStorage.setObject('mindSeal', dbData);
    }
  } else {
    //or POST request (refresh db)
    //make sure the format is
    //{ userid string, deck object }, userid only needed until auth takes over
    //test token "ya29.7gEsxQFWSnC61hqtKmtfTRBfd9afp6426-71s1I_15KbOYDba5I-ZPZ66-Hil_7-OUON"

    var sendData = {'userid': 'mvp_test', 'decks': localStorage.getObject('mindSeal').decks};

    m.request({
      method: 'POST',
      url: '/refresh',
      data: sendData
    })
    .then(function(response){
      console.log("server post response below:");
      console.log(response);
    })
  }
}


Deck.find = function (id) {
  // Get deck matching id
  if(App.mindSeal.decks[id] === undefined) {
    alert("Deck.find failed, could not find the requested deck: " + id)
  } else {
  return App.mindSeal.decks[id]
  }
}

Deck.createCard = function (deckId, cardProps) {
  // Create a new card in deck matching deckId.
  // cardProps should include at minimum .front and .back properties.

//   m.request({
//     method: 'POST', 
//     url: '/decks/' + deckId + '/cards',
//     data: cardProps
//   })
//   .then(function(addedCard) {
//     ctrl.cards().push(addedCard)
//   })
}

//TODO: ask Kyle about momentjs here and correct the parameters for create deck.
Deck.createDeck = function (name) {
  console.log("the deck name as passed to the Deck.js is: ", name);
  //create an empty deck object and set it to local storage
  App.mindSeal.decks[name] = {cards:[], creation: moment().format('MM-DD-YYYY')}; //initiate an empty deck with the passed in name
  setMindSeal();
}

// ctrl.getDecks = function(username){ //this gets called by home.js
//     m.request({ 
//       method: 'GET',
//       url: '/decks',
//       data: username //?? credentials system?
//     })
//     .then(function(arrayOfDecks){
//       arrayOfDecks.forEach(function(deck,index){
//         App.decks.push(deck) //is this right?
//       })
//     })
//   }
