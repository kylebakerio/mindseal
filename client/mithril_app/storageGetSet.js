
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
if ( !localStorage.getObject('mindSeal') ){
  console.log('there was no mindseal, creating an empty one.')
  localStorage.setObject('mindSeal', { decks:{} }) 
}



// the rest of this document specifies a devmode, where two decks 
// with two cards are automatically stored.

// !!WARNING!! If you have real deck data on your machine, devMode will
// erase that data with this demo data! Use at your own risk!

//set here!
var devMode = true;

if( 
    devMode === true && 
    !localStorage.getObject('mindSeal').decks &&
    (prompt("WARNING! devMode is on, and it appears there are no decks. \
      Overwrite ALL LOCAL DATA with dummy data? Type 'yes' to continue.") === "yes")
  ) {

  console.log("there are no decks, devmode is on, user approved; adding dummy decks.")
  
  localStorage.setObject('mindSeal',
    {
    decks: { 
      mvp: { //this is a deck's name
        cards: [ //these are card unique ID's
          {                        // this is a card itself
            front: "this is card1's front",
            back: "this is card1's back",
            tVal: 129600000, //this is the difference between the next two values
            toBeSeen: moment(),
            timeLastSeen: moment().subtract(36,'h'),
            cMem:[],
            cScale:{}      
          },
          {
            front: "this is card2's front",
            back: "this is card2's back",
            tVal: 129600000, //this is the difference between the next two values
            toBeSeen: moment(),
            timeLastSeen: moment().subtract(36,'h'),
            cMem:[],
            cScale:{}      
          }
        ]
      },
      demoDeck2: { 
        cards: [ 
          { 
            front: "this is card5's front",
            back: "this is card5's back",
            tVal: 129600000, 
            toBeSeen: moment(),
            timeLastSeen: moment().subtract(36,'h'),
            cMem:[],
            cScale:{}      
          },
          { 
            front: "this is card6's front",
            back: "this is card6's back",
            tVal: 129600000, 
            toBeSeen: moment(),
            timeLastSeen: moment().subtract(36,'h'),
            cMem:[],
            cScale:{}      
          }
        ]
      }
    }
  }
  ) //ends localStorage.setObject

}

else if ( devMode === true && localStorage.getObject('mindSeal').decks ) {
  console.log("devMode is on, but there is already a decks object. Nothing will be changed.\
  if you want to write dummy decks anyways, and ERASE ALL mindSeal data!!! \
  type the following into the console:\
  localStorage.setObject('mindSeal', {})\
  and then refresh the page.")
}

console.log("storageGetSet did not fail!")
