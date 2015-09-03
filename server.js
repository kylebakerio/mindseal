var express     = require('express'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    handler     = require('./server/utils/requestHandler.js');

var app = express();
var PORT = 1337;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
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
  function(req, res) {
    res.send('Get decks!')
  }
);

app.post('/decks',
  // Update or create a deck
  function(req, res) {
    res.send('Create a deck!')
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

app.post('/decks/*',
  // Update or create cards in a deck
  function(req, res) {
    var path = req.path;
    res.send('Create a card in ' + path)
  }
);

app.delete('/decks/*',
  // Delete a card (or cards)
  function(req, res) {
    res.send('Remove a card!')
  }
);

console.log('App is listening on port ' + PORT);
app.listen(PORT);