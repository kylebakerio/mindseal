var request = require('request-promise');

exports.module = {

  auth: function(req, res) {
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

// For test:
// var testReq = {
//   get: function(token) {
//     return 'ya29.6gF3ZryG6ClCekLxYvD6xZxqsb7THVuX7CmD457pIdLTCDn7WpsVwSVCYNCUgxzfggOr'
//   }
// };

// exports.module.auth(testReq);
