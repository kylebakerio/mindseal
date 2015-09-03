
module.exports = {

  login: function(req, res) {
    var user = JSON.parse(req.get('user'));
    var username = user.username;
    var pass = user.password;

    
  }
};