var db = require('../models/userData.js');
var Auth  = require ('./auth.js');
var bcrypt = require('bcrypt-nodejs');

////gilbert's example:
// var promise = new Promise(function(resolve, reject) {
//   bcrypt.hash(password, salt, null, function(err, hash) {
//     if (err) {
//       reject(err)
//     }
//     else {
//       resolve(hash)
//     }
//   })
// })

// promise.then(...)
////end example


module.exports = {
  userExists: function(username){
    console.log("should talk to database to see if exists: " + username);
    return db.userFind(username);
  },

  makeUser: function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    console.log("attempting to make user: " + username + " " + password);
    
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) {
            console.log("hashing the password failed, see user.js " + err);
          }
          else {
            console.log("hash was successful.");
            // console.log("promise object? : ")
            // console.log(db.createUser(username, hash))
            // return db.createUser(username, hash)
            resolve(hash);
          }
        })
      })
    })
    .then(function(hash){
      console.log("hash to model: " + hash)
      return db.createUser(username, hash)
    })
  },

  login: function(req, res){
    console.log("attempt login with: " + req.body.username + req.body.password);

    var username = req.body.username;
    var password = req.body.password;

    return db.userFind(username)
    .then(function(userObj){
      if(!userObj){
        console.log("did not find " + username + " in database.");
        res.send({message:"failed: no such username"});
      }
      else {
        console.log("found user: " + userObj._id);
        return new Promise(function(resolve, reject){
          bcrypt.compare(password, userObj.hashword, function(err, bool) {
            resolve({bool:bool, 
              user:userObj._id,
              mindSeal: userObj
            })
          })
          // .catch(function(err){
          //   console.log("error: ", err);
          // })
        })
      } 
    })
  },

  getShared: function(){

    // db.getShared()
    //   .then(function(sharedDecks){
    //     res.send(sharedDecks);
    //   })
    //   .catch(function(error){
    //     console.log("error from getShared: " + error);
    //     res.send(500, error);
    //   })
  },

  shareDeck: function(req, res){    
    db.shareDeck(deckName, deck)
      .then(function(ok){
        res.send("success");
      })
      .catch(function(error){
        res.send(500, error);
      })
  },

  // OLD STUFF -- REWRITE

  getDecks: function(req, res) {
    // var googleId = "mvp_test";
    // var googleId = req.headers.userid;
    db.getDecks(/*googleId*/)
      .then(function(decks) {
        res.send(decks);
      })
      .catch(function(err) {
        console.log(err, "handler");
        res.send(500, err);
      });
  },

  // getDecks: function(req, res) {
  //   // With Auth:
  //   Auth.getId(req)
  //     .catch(function(err) {
  //       // Handler for unsuccessful auth with Google
  //       res.send(401, err);
  //     })
  //     .then(function(googleId) {
  //       console.log(googleId, " :id in reqh auth")
  //       return db.getDecks(googleId)
  //     })
  //     .then(function(decks) {
  //       console.log(decks, " : decks passed to reqH")
  //       res.send(decks);
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //       res.send(500, err);
  //     });
  // },

  refreshDecks: function(req, res) {
    var decks = req.body.decks; //use just body when Auth integrated/tested
    Auth.getId(req)
      .catch(function(err) {
      // Handler for unsuccessful auth with Google
      res.send(401, err);
      })
      .then(function(googleId) {
        return db.refreshDecks(googleId, decks)
      })
      .then(function() {
          res.send(201)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  },

  createDecks: function(req, res) {
    var googleId = req.body.googleId;
    var deckName = req.body.deckName;
    // var googleId = req.get('googleId');
    // var googleId = 'mvp_test';
    db.createDecks(googleId, deckName, req.body.deck)
      .then(function(deck_id) {
        res.send(201, deck_id)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  },

  createUser: function(req,res) {
    console.log(req.headers, ": check for chrome token")
    Auth.getId(req)
      .catch(function(err) {
        res.send(401,err);
      })
      .then(function(googleId) {
        return db.createUser(googleId);
      })
      .then(function() {
        res.send(201);
      })
      .catch(function(err) {
        console.log(err);
        res.send(501, err);
      });
  },

  setMindSeal: function(username, mindSeal, time){
    console.log("mindseal is:",mindSeal);
    mindSeal.userSettings.lastEdit = time;
    return db.refreshDecks(username, mindSeal.decks)
    .then(function(success){
      console.log("after refreshing decks:",success);
      return db.setSettings(username, mindSeal.userSettings)
    })
    .catch(function(err){
      console.log("err @ setMindSeal reqHan", err)
    })
  }

  // createDeck: function(req, res) {
  //   // With Auth:
  //   var deckName = req.body.deckName;

  //   Auth.getId(req)
  //     .catch(function(err) {
  //       // Handler for unsuccessful auth with Google
  //       res.send(401, err);
  //     })
  //     .then(function(googleId) {
  //       return db.createDeck(googleId, deckName, req.body);
  //     })
  //     .then(function(deckId) {
  //       res.send(201, deckId)
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //       res.send(500, err);
  //     });
  // }
};


  //old, pre-refactor:

  // makeUser: function(req, res){
  //   bcrypt.genSalt(10, function(err, salt){
  //     bcrypt.hash(password, salt, null, function(err, hash) {
  //       if (err) {
  //         console.log("hashing the password failed, see user.js " + err);
  //       }
  //       else {
  //         console.log("hash was successful.");
  //         // console.log("promise object? : ")
  //         // console.log(db.createUser(username, hash))
  //         // return db.createUser(username, hash)
  //         db.createUser(username, hash)
  //         .then(function(x){

          
  //           res.send({data:"make a session"});
          

  //         })
  //         .catch(function(error){
  //           console.log("encryption error: " + error);
  //           res.send({message:"failed.",error:error});
  //         })
  //       }
  //     })
  //   })
  // },