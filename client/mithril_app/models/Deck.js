window.Deck = {};

// App.newDeck = new Deck();
// App.newDeck.addCard(/*new card model*/)

//maybe refresh with server or fetch from local storage
Deck.fetch = function(shared) { //should be the server call to get a Decks object
  if (!shared){
    console.log("fetching user's decks!");
    //get all decks
    return m.request({
      method: 'GET', 
      url: '/decks/'
    }).then(function(res){

    })
  } else if (shared === "shared") {
    console.log("get shared decks!");
    //stopgap for what is desired to be returned from server.
   
    return m.request({
      method: 'GET', 
      url: '/decks/shared'
    })

    // return 
    // {
    //   sharedDeck1: {
    //     cards:[Card.vm({front:"front1!!", back:"back111!!!"}), Card.vm({front:"front2!!", back:"back222 holy shit this works!!!!"})],
    //     description: "this is the description for deck 1",
    //     creation: moment('1989-12-30T20:05:41-05:00').format()
    //   },
    //   sharedDeck2: {
    //     cards:[Card.vm({front:"front21!!", back:"back2111!!!"}), Card.vm({front:"front22!!", back:"back2222222 holy shit this works!!!!"})],
    //     description: "this is the description for deck 2",
    //     creation: moment("1969-10-20T20:05:41-05:00").format()
    //   }
    // }
  } else {
    console.log("bad input on Deck.fetch: " + shared);
  }
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

//this is bad. This needs to be done in a more consistent way, a la Card.vm
Deck.createDeck = function (name, obj) {
  console.log("the deck name as passed to the Deck.js is: ", name);
  //create an empty deck object and set it to local storage
  //if you pass in an object for the second parameter, any defaults you provide will be saved. 
  //otherwise, a new one will be made for you.
  if (obj) {
    App.mindSeal.decks[name] = obj;
    App.mindSeal.decks[name].creation = moment().format();
  }
  else {
    App.mindSeal.decks[name] = {creation: moment().format(), cards: []}; //initiate an empty deck with the passed in name
  }
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

Deck.binaryInsert = function(index,arr,prop,card){
  //if 'card' argument is supplied, and index is null, we're inserting a new card. 
  //if index is supplied, we've updated arr[index] and need to to find its new home.
  console.log("index is " + index)
  if (card && index === null) var obj = card;
  else {
    var obj = arr[index];
    arr.splice(index,1);
  }

  if (arr.length === 0) arr.push(obj); //empty array, just pop it in.
  else if (obj[prop] < arr[0][prop]) arr.unshift(obj); //goes to front.
  else if (obj[prop] > arr[arr.length-1][prop]) arr.push(obj);  //goes to back.
  else { //none of the above, need to try binary insertion.
    var recur = function(pos,r){
      if (arr[pos][prop] >= obj[prop] && arr[pos-1][prop] <= obj[prop]) arr.splice(pos, 0, obj);  
      else if (arr[pos][prop] <= obj[prop] && arr[pos+1][prop] >= obj[prop]) arr.splice(pos+1, 0, obj);
      else if (arr[pos][prop] > obj[prop]) recur(Math.ceil(pos-r), Math.ceil(r/2));
      else if (arr[pos][prop] < obj[prop]) recur(Math.ceil(pos+r), Math.ceil(r/2));
      else {
        alert("error with binary insertion. Please check console to inspect problem card.")
        console.log(obj);
      }
    }
    recur(Math.ceil((arr.length-1)/2), Math.ceil(arr.length/4));
  }
  setMindSeal();
}

Deck.isSorted = function(array){
  var last = array[0];
  console.log("--------BEGIN DISPLAY OF ALL CARD TO-BE-SEEN TIMESTAMPS --------")
  console.log("Card -" + last.front + "-, ready to be seen " + moment(last.toBeSeen).fromNow())
  for (var i = 1; i < array.length; i++){
    console.log("Card -" + array[i].front + "-, ready to be seen " + moment(array[i].toBeSeen).fromNow())
    if (array[i].toBeSeen < last.toBeSeen) return false;
    last = array[i];
  }
  console.log("--------------SUCCESS?----------------")
  return true;
}
