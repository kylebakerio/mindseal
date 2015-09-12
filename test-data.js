/*steps to setup the database
  run mongod in one terminal tab, run mongo in the second, in that order
  copy-paste this script in the mongo shell (second tab).

  todo: make this auto-run using mongo 'test-script.js'
*/

// Test script for integration testing

// show current databases
db
//creates a database if it doesn't already exist
use mindseal
// won't save the new database untill a collection has been created
db.createCollection('userData')
//insert test data to collection

db.userData.insert({ 
                _id: "uniqueUserGoogleId", 
                name: "Jeff Uberman", 
                decks: { 
                  deck1: {
                    name: "javascript essentials",
                    cards: [{ 
                      _id: "autoincr1",
                      front: "this is the title card",
                      back: "this is the solution card",
                      timeLastSeen: 0,
                      toBeSeen: 0,
                      cScale: {},
                      cMem: []
                    },
                    { _id: "autoincr2",
                    front: "front of the second card",
                    back: "back of the second card",
                    timeLastSeen: 0,
                    toBeSeen: 0,
                    cScale: {},
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
                      cScale: {},
                      cMem: []

                    },
                    { _id: "autoincr2",
                    front: "front of the second jquery card",
                    back: "back of the second jquery card",
                    timeLastSeen: 0,
                    toBeSeen: 0,
                    cScale: {},
                    cMem: []
                    }]
                  }
                }
              })

/*


//misc queries to play with the data

db.userRecordsObj.update( {_id: "uniqueUserGoogleId"}, {$set: {"decks.deck1.name": "updated" } } ) //note: quotes around nested keys

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


*/


