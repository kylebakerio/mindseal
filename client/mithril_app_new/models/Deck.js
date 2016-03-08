window.Deck = {};

// App.newDeck = new Deck();
// App.newDeck.addCard(/*new card model*/)

//maybe refresh with server or fetch from local storage

Deck.fetch = function(getShared) {
  // todo: rewrite, this is ugly
  // argument is optional.
  // if run without an argument, gets user's decks.
  // else, gets shared decks.
  if (getShared === undefined){
    console.log("fetching user's decks!");
    return m.request({
      method: 'GET', 
      url: '/decks/'
    });
  } else {
    console.log("get shared decks!");
    return m.request({
      method: 'GET', 
      url: '/decks/shared'
    });
  }
}

Deck.share = function(deck, deckName){

  var share = JSON.parse(JSON.stringify(deck));

  share.cards.forEach(function(card){
    card.timeLastSeen = "shared";
    card.toBeSeen = "shared";
  })

  share.unseen = share.cards;
  share.cards  = [];

  console.log("sharing", deckName + ": ", share)

  return m.request({
    method: 'POST',
    url: '/decks/shared',
    data: {deck: share, deckName: deckName}
  })
  .then(function(res){
    console.log(res.message);
  })
}


Deck.find = function (deckName) {
  console.log("App:",App);
  if(App.mindSeal.decks[deckName] === undefined) {
    alert("Deck.find failed, could not find the requested deck: " + deckName)
  } else {
  return App.mindSeal.decks[deckName]
  }
}

//this is bad. This needs to be done in a more consistent way, a la Card.vm
Deck.createDeck = function (name, obj) {
  console.log("the deck passed to the Deck.js is: ", obj);
  //create an empty deck object and set it to local storage
  //if you pass in an object for the second parameter, any defaults you provide will be saved. 
  //otherwise, a new one will be made for you.
  
  if (obj) {
    App.mindSeal.decks[name] = obj;
    App.mindSeal.decks[name].creation = obj.creation || moment().format();
    App.mindSeal.decks[name].description = obj.description || "";
    App.mindSeal.decks[name].cards = obj.cards || [];
    App.mindSeal.decks[name].author = obj.author || App.mindSeal.userSettings.username;
    App.mindSeal.decks[name].unseen = obj.unseen || [];
  }
  else {
    App.mindSeal.decks[name] = {author:  App.mindSeal.userSettings.username, creation: moment().format(), cards: [], unseen: [], description:"No description given"}; //initiate an empty deck with the passed in name
  }
  User.sync()
}

Deck.binaryInsert = function(index,arr,prop,card){
  //if 'card' argument is supplied, and index is null, we're inserting a new card. 
  //if index is supplied, we've updated arr[index] and need to to find its new home.
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
  // setMindSeal();
}

Deck.isSorted = function(array){
  console.log("checking this array for sortedness:",array)
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
