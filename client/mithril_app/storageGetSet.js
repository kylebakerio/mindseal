
//these seem to get lost on every session, so we reload these onto the 
//prototype every time we start the webapp just to be safe.

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

function getToken(callback) {
  // Use this function to either sign in for the first time or grab the current token from Chrome.
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      return;
    }
    console.log("success");
    return token;
    if ( callback ) { 
      callback(token);
    }
});

//this function allows the current sandbox App.mindSeal() object to be commited to local storage for persistent retrieval.
function setMindSeal(){ 
  App.mindSeal().userSettings.lastEdit = moment().format();
  localStorage.setObject('mindSeal', App.mindSeal()) 
}

console.log( "getter and setter are " + (Storage.prototype.getObject ? "loaded" : "not loaded") )

// source: http://stackoverflow.com/a/3146971/4526479
// use: 
  // var userObject = { userId: 24, name: 'Jack Bauer' }; 
  // to set it: localStorage.setObject('user', userObject); 
  // retrieve it: userObject = localStorage.getObject('user'); 

// this last tidbit creates a mindSeal object if none exist...
// in other words, this should only ever run on initial use.
// we might want to make this more robust, but I can't initially
// think of any case where this would actually do the unspeakable
// and erase all user data, even though in theory one would
// worry about that possibility here. If it doesn't exist, you
// can't erase it.

if ( !localStorage.getObject('mindSeal') ){
  console.log('there was no mindseal, creating an empty one.')
  localStorage.setObject('mindSeal', { decks:{} }) 
}
