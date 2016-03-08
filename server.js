var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var handler     = require('./server/utils/requestHandler.js');
var app         = express();
var PORT        = process.env.PORT || 6060;
var moment      = require('moment');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));

var session = require('cookie-session')
app.use(session({
  name: 'session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}))

app.get('/decks/shared', function(req, res){
  console.log("trying to get shared decks");
  handler.getShared(req,res)
  .then(function(shared){
    console.log("shared decks?",shared);
    res.send({decks: shared});
  })
  .catch(function(err){
    console.log("err getting decks:",err);
  })
})

app.post('/decks/shared', function(req, res){
  console.log("trying to share: ", req.body.deckName, req.body.deck);
  // console.log(req.body);
  handler.shareDeck(req.body.deck, req.body.deckName)
  .then(function(answer){
    console.log("seems shareDeck was successful");
    res.send({message: "success"});
  })
  .catch(function(err){
    console.log("error sharing deck " + req.deckName, err);
    res.status(404).send({message:"database error:", error:err});
  })
})

app.post('/signup', function(req, res) {
  var user = handler.userExists(req.body.username)
  .then(function(answer){
    if (answer !== null){
      console.log(req.body.username + " was taken")
      res.send({login: false, message: req.body.username + " is taken"});
      return null;
    } else if (answer === null) {
      console.log("username not taken")
      handler.newUserEmail(req.body.username);
      return handler.makeUser(req, res);
    }
  })
  .catch(function(err){
    console.log("error during user lookup:", err);
    res.status(404).send({message:"database error:", error:err});
  })

  if (user !== null){
    user
    .then(function(x){
      console.log("this is returned from handler.makeUser: ", x)
      console.log(x.ops[0]._id)
      req.session.user = x.ops[0]._id;
      var mindSeal = { 
        userSettings: {
          username: x.ops[0]._id,
          newCardLimit: null,
          tValDefault: 128000000, 
          lastEdit: req.body.time, 
          todayCounter: 0,
          allTimeCounter: 0,
          cScaleDefault: {0: 0.9, 1: 1.2, 2: 1.8, 3: 2.5},
          accountMade: req.body.time
        },
        decks: {}
      };
      handler.setMindSeal(req.session.user, mindSeal, req.body.time);
      res.send({
        login: true, 
        mindSeal: mindSeal
      });
    })
    .catch(function(error){
      console.log("make user error: " + error);
      res.status(401).send({message:"failed.",error:error,login:false});
    })
  }

});

app.post('/login', function(req, res) {
  handler.login(req, res)
  .then(function(obj){
    if (obj.bool){
      console.log("username and password are valid. login granted.");
      req.session.user = obj.user;
      console.log("obj is:", obj)
      var mindSeal = {decks:obj.mindSeal.decks, userSettings:obj.mindSeal.userSettings};
      console.log("mindSeal sending: (disabled, enable if desired)"/*, mindSeal*/);
      res.status(200).send({
        login: true, 
        message:"Login Successful", 
        mindSeal: {decks:obj.mindSeal.decks, userSettings:obj.mindSeal.userSettings}
      });
    }
    else {
      console.log("password invalid")
      res/*.status(401)*/.send({login: false, message:"Your username and/or password are incorrect."})
    }
  })
  .catch(function(error){
    console.log(error);
    res.status(404).send({message:"database error:", error:err});
  })
});

app.post('/logout', function(req, res) {
  console.log("logging out, attempting to update with the following:",
    req.session.user, /*req.body.mindSeal,*/ req.body.time);
  handler.setMindSeal(req.session.user, req.body.mindSeal, req.body.time)
  .then(function(result){
    console.log('success, blanking out cookie');
    req.session.user = null; 
    res.status(200).send({
      logout: true, 
      message:"You have been successfully logged out."
    });
  })
  .catch(function(err){
    console.log("err caught logout server",err);
    res.status(404).send({message:"database error:", error:err});
  })

});

app.post('/sync', function(req, res) {
  console.log("syncing");
  handler.setMindSeal(req.session.user, req.body.mindSeal, req.body.time)
  .then(function(result){
    res.status(200).send({
      success: true, 
      message:"sync successful.",
      result: result
    });
  })
  .catch(function(err){
    console.log("err caught while syncing",err);
    res.status(404).send({message:"database error:", error:err});
  });
});

app.get('/decks', function(req, res) {
  handler.userExists(req.session.user)
  .then(function(userObj){
    console.log("userObj:",userObj);
    if(!userObj){
      console.log("did not find " + username + " in database.");
      res.status(200).send({login:false, message:"did not find " + username + " in database."});
    }
    else {
      console.log("found user: " + userObj._id);
      res.send({login:true, user:userObj._id, mindSeal: {decks: userObj.decks, userSettings: userObj.userSettings}})
    } 
  })
  .catch(function(err){
    console.log("Error caught! while getting decks:", err);
    res.status(200).send({login:false, message:"failed: error while trying to get decks."});
  });
});

app.post('/decks', function(req, res) {
  console.log(req.session);
  handler.createDecks(req, res);
});

app.get('/whoami', function(req,res){
  console.log("whoami requrest: ", req.session);
  res.send(req.session.user);
})

app.get('/admin', function(req, res){
  var mostRecent
  handler.getStats()
  .then(function(data){
    handler.sendStats(data, req, res)
  })
})

console.log('App is listening on port ' + PORT);
app.listen(PORT);
