var express     = require('express'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    handler     = require('./server/utils/requestHandler.js');

var app = express();
var PORT = 1337;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));


app.get('/users',
  // Log a user in
  function(req, res) {
    res.send('Login!')
  }
);

app.post('/users',
  // Create a new user account
  function(req, res) {
    res.send('Create account!')
  }
);

app.get('/decks',
  // Get all decks
  // should expect user ID in request
  function(req, res) {
    handler.getDecks(req,res);
  }
);

app.post('/decks',
  // Update or create a deck
  function(req, res) {
    handler.createDeck(req,res);
  }
);

app.delete('/decks',
  // Delete a deck
  function(req, res) {
    res.send('Remove a deck!')
  }
);

app.get('/decks/*',
  // Get a specific deck
  function(req, res) {
    res.send(200, 'Get cards in ' + req.path)
  }
);

app.post('/decks/*/cards',
  // Update or create cards in a deck
  function(req, res) {
    var path = req.path;
    res.send('Create a card in ' + path)
  }
);

app.delete('/decks/*/cards',
  // Delete a card (or cards)
  function(req, res) {
    handler.addCards(req, res)
  }
);

console.log('App is listening on port ' + PORT);
app.listen(PORT);
