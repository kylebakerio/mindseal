var MongoClient = require('mongodb').MongoClient;
var url = require('../cred.js')['mongoConStr'];
var collection;

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if (err === null){
    console.log("Connected correctly to mongodb server");
  }

  collection = db.collection('userData');
});

module.exports = {
  getShared: function(){
    console.log("attempting to grab shared decks.");
    return collection.findOne({_id: "shared"});
  },

  shareDeck: function(deckName, deck){
    console.log("attempting to share deck: " + deckName);
    setObject = {"$set":{}};
    setObject["$set"]["decks."+deckName] = deck;
    return collection.update({_id: "shared"}, setObject)
  },

  userFind : function(username){
    console.log("trying to find " + username + " in database");
    return collection.findOne({_id: username});
  },

  createUser: function(username, hashword){
    console.log(username, hashword, "data as recieved by the model");
    return collection.insert({ _id: username, hashword: hashword, decks: {} });
  },

  refreshDecks: function(username, decks){ //replaces the user's current decks in database completely
    return collection.update({_id: username}, {$set: {decks: decks}}) //returns a success or error
  },

  setSettings: function(username, settings){ //overwrites settings with new settings.
    console.log("settings to add:", settings);
    if (Object.keys(settings).length === 0) console.log("empty settings object, not updating.")
    return collection.update({_id: username}, {$set: {userSettings: settings}}) //returns a success or error
  },

  getAllUsers: function(){
    return collection.find().toArray();
  }

}
