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

    request(options)
      .then(function(response) {
        var userInfo = response.body
        return userInfo;
      })
      .catch(function(err) {
        console.log(err);
        return err;
      });
  }

};
