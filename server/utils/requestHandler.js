var db          = require('../models/userData.js');
var bcrypt      = require('bcrypt-nodejs');
var cred        = require('../cred.js');
var nodemailer  = require('nodemailer');
var sendEmail   = cred.emailConStr;
var recEmail    = cred.recipentEmail;

var transporter = nodemailer.createTransport(sendEmail);

module.exports = {
  userExists: function(username){
    console.log("checking to see if: " + username + " exists");
    var y = db.userFind(username)
    console.log("this was returned from model db.userFind call: ", y);
    return y;
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
            reject(err);
          }
          else {
            console.log("hash was successful.");
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
        res.send({login:false, message:"Your username and/or password are incorrect."});
      }
      else {
        console.log("found user: " + userObj._id, userObj);
        return new Promise(function(resolve, reject){
          bcrypt.compare(password, userObj.hashword, function(err, bool) {
            resolve({bool:bool, 
              user:userObj._id,
              mindSeal: userObj
            })
          })
        })
      } 
    })
  },

  getShared: function(){
    var sharedDecks = db.userFind("shared")
    console.log("sharedDecks is promise:", sharedDecks instanceof Promise)
    return sharedDecks
    .then(function(userObj){
      if(!userObj){
        //TODO: error handling, should not fail silently
        console.log("Did not find shared decks.");
        return {message:"failed: no shared user"};
      }
      else {
        console.log("returning shared decks");
        return userObj.decks;
      } 
    })
  },

  setMindSeal: function(username, mindSeal, time){
    mindSeal.userSettings.lastEdit = time;
    console.log("mindseal is:",mindSeal);
    console.log("time is:",mindSeal.userSettings.lastEdit);
    return db.refreshDecks(username, mindSeal.decks)
    .then(function(success){
      console.log("refreshed decks of " + username + " with ", mindSeal.decks);
      return db.setSettings(username, mindSeal.userSettings)
    })
    .catch(function(err){
      console.log("err @ setMindSeal reqHan", err)
    })
  },

  shareDeck: function(deck, deckName){    
    return db.createDeck("shared", deckName, deck);
  },

  getStats: function(){
    return db.getAllUsers();
  },

  sendStats: function(data, req, res) {
    var badNames = [];
    var goodNames = data.map(userObj => {
      var username = userObj._id;
      var reg = /test|llama|asd|another|user|another|onemore|qwe|atn|ert|sidjasid|abc123|-q-|--q|^a$|^a2$|^A$|doesitwork|ggg/;

      if (reg.exec(username) === null && username.length < 15) {
        return "<br/>" + username;
      }
      else {
        badNames.push("<br/>" + username);
        return null
      }
    });

    goodNames = goodNames.filter(name => name !== null);

    var userCount = goodNames.length;
    
    res.send("<p><b>User Count:</b>" + userCount + "<br/><br/><b>Users: </b><br/>" +
      goodNames + "<br/><br/><b> Filtered Testing Accounts: </b><br/>" + badNames +
      "<br/><br/><br/>" + "</p>");
  },

  newUserEmail: function(username){
    console.log("sending email");
    var mailOptions = {
      from: '"mind-seal.com" <mindsealmailer@gmail.com>', // sender address
      to: 'admin, ' + recEmail, // list of receivers
      subject: 'New User! ✔', // Subject line
      text: 'Hello master 🐴', // plaintext body
      html: '<b>Someone new signed up at mind-seal.com! Their username is:' + username + '🐴</b>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  }

};
