
//these seem to get lost on every session, so we reload these onto the 
//prototype every time we start the webapp just to be safe.

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

console.log( "getter and setter are " + (Storage.prototype.getObject ? "loaded" : "not loaded") )

// source: http://stackoverflow.com/a/3146971/4526479
// use: 
  // var userObject = { userId: 24, name: 'Jack Bauer' }; 
  // to set it: localStorage.setObject('user', userObject); 
  // retrieve it: userObject = localStorage.getObject('user'); 

// this last tidbit creates a user deck object if none exist...
// in other words, this should only ever run on initial use.
// we might want to make this more robust, but I can't initially
// think of any case where this would actually do the unspeakable
// and erase all user data, even though in theory one would
// worry about that possibility here.

if ( !localStorage.getObject('mindSeal') ){
  console.log('there was no mindseal, creating an empty one.')
  localStorage.setObject('mindSeal', { decks:{} }) 
}

