var request = require('request-promise');

exports.module = {

  getId: function(req) {
    // Fetches a user ID from google based on api-token header on req
    var token = req.get('api-token');
    var options = {
      uri: 'https://www.googleapis.com/plus/v1/people/me',
      method: 'GET',
      headers: {
        Authorization : 'Bearer ' + token
      }
    };
    console.log(options);
    request(options)
      .then(function(response) {
        var googleId = JSON.parse(response).id;
        console.log("ID: ", googleId);
        return googleId;
      })
      .catch(function(err) {
        console.log(err);
        return err;
      });
  }

};

