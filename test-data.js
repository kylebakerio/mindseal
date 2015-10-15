/*steps to setup the database
  http://docs.mongodb.org/master/installation/

  run mongod in one terminal tab, run mongo in the second, in that order
  copy-paste this script in the mongo shell (second tab).

*/

// Test script for integration testing

// show current databases
db
//creates a database if it doesn't already exist
use mindseal
// won't save the new database untill a collection has been created
db.createCollection('userData')
// insert test data to collection

// If user already exists. Use update.
// _id is the primary key. Use by creating a unique one on insert or use Google Auth.

db.userData.insert({ 
  // _id: "",  //test with chrome developer id
  name: "Green Field",
  userSettings: {
  newCardLimit: 20,
  tValDefault: 128000000, //initial gap between making a card and it being seen for the first time
  lastEdit: "2015-09-15T10:29:16-05:00", // for syncing purposes.
  todayCounter: 0,
  allTimeCounter: 197
  }, 
  decks: { 
    deck1: {
      name: "trivia",
      cards: [{ 
        _id: "autoincr1",
        front: "Who is your daddy?",
        back: "Probably Gilbert.",
        timeLastSeen: 0,
        toBeSeen: 0,
        cScale: {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5},
        cMem: []
      },
      { _id: "autoincr2",
      front: "What is Jake Gyllenhall's first name?",
      back: "....Glenn?",
      timeLastSeen: 0,
      toBeSeen: 0,
      cScale: {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5},
      cMem: []
      }]
    },

    deck2: {
      name: "jQuery essentials",
      cards: [{ 
        _id: "autoincr1",
        front: "this is the first jquery card",
        back: "this is the solution jquery card",
        timeLastSeen: 0,
        toBeSeen: 0,
        cScale: {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5},
        cMem: []

      },
      { _id: "autoincr2",
      front: "front of the second jquery card",
      back: "back of the second jquery card",
      timeLastSeen: 0,
      toBeSeen: 0,
      cScale: {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5},
      cMem: []
      }]
    }
  }
})



db.userData.update({_id: ""}, {$set: {userSettings: {
  newCardLimit: 20,
  tValDefault: 128000000, //initial gap between making a card and it being seen for the first time
  lastEdit: "2015-09-15T10:29:16-05:00", // for syncing purposes.
  todayCounter: 0,
  allTimeCounter: 197
  }, 
  decks: { 
    deck1: {
      name: "trivia",
      cards: [{ 
        _id: "autoincr1",
        front: "Who is your daddy?",
        back: "Probably Gilbert.",
        timeLastSeen: 0,
        toBeSeen: 0,
        cScale: {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5},
        cMem: []
      },
      { _id: "autoincr2",
      front: "What is Jake Gyllenhall's first name?",
      back: "....Glenn?",
      timeLastSeen: 0,
      toBeSeen: 0,
      cScale: {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5},
      cMem: []
      }]
    }

  }}})




//misc queries to play with the data

db.userRecordsObj.update( {_id: "uniqueUserGoogleId"}, {$set: { : "updated" } } ) //note: quotes around nested keys

// updating a deck name
db.userRecordsObj.update( {_id: "uniqueUserGoogleId"}, {$set: {"decks.deck1.name": "updated" } } )

//adding a new card to a deck
db.userRecordsObj.update({_id: "uniqueUserGoogleId"}, {$push: {"decks.deck1.cards": {_id: "autoincr3", front: "testing update", back: "testing update", flag: 0}  }})

//edit an existing card
db.userRecordsObj.update({_id: "uniqueUserGoogleId"}, {$push: {"decks.deck1.cards": {$each:[{_id: "autoincr4"}], $position: 0 } }})

//refreshing(replacing) a deck using set over an embedded document reference will change the doc 
db.userRecordsObj.update({_id: "google_id1"}, {$set: {decks: {}}})

//reading all the decks of a user, can't supress the field filtering by 
db.userRecordsObj.find({_id: "uniqueUserGoogleId"}, {decks: 1});

//sorting values in the cards array using a flag-field/ name-field for now (nesting not working!)
db.userRecordsObj.update({_id: "uniqueUserGoogleId"}, {$push: {"decks.decks1.cards": {$each: [], $sort: {flag: 1 } }}} )

//sorting example
db.sample.update({_id: "yak"}, {$push: {anArray: {$each: [], $sort: {flag: 1}}}})

//create an index on a specific deck
db.userRecordsObj.createIndex({"decks.deck1": 1})

//get all indexes for a collection
db.userRecordsObj.getIndexes()

//find query on the custom indexed field
db.userRecordsObj.find({"decks.deck1.name": "deckName"})

//find query on the custom indexed field and suppressing other fields
db.userRecordsObj.find({"decks.deck1.name": "deckName"}, {name: false, _id: false})





