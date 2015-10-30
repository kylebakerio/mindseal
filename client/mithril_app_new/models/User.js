window.User = {}

User.signUp = function(username, password) {

  console.log("trying to call server (signup) with u/p: " + username + " " + password)
  return m.request({
    method: 'POST',
    url: '/signup',
    // config: xhrConfig,
    data: {username: username, password: password, time: moment().format()}
  })
  .then(function(data){
    if (data.login === true){
      window.App = {};
      App.mindSeal = data.mindSeal;
      m.route('/home');
    }
    else if (data.login === false){
      console.log("signup failed, username taken")
      alert(data.message);
    }
    console.log("data.login was: ", data.login); 
    return data;
  })
}

User.login = function(username, password) {
  console.log("trying to call server (login) with u/p: " + username + " " + password)

  return m.request({
    method: 'POST',
    url: '/login',
    data: {username: username, password: password}
  }).then(function(data){
      if (data.login === true){
        window.App = {};
        App.mindSeal = data.mindSeal;
        console.log("get the newly minted mindSeal:",App.mindSeal)
        localStorage.mindSeal = true;
        m.route('/home');
      }
      else if (data.login === false){
        alert(data.message);
      }
      console.log("data was: ", data); 
      return data;
  })
}

User.logout = function(){
  //should sync with server, and maybe not do rest if fails?
  console.log("going to send:",App.mindSeal);
  return m.request({
    method:'POST',
    url: '/logout',
    data: {time: moment().format(),mindSeal:App.mindSeal}
  }).then(function(data){
    console.log("logout server response: ", data);
    localStorage.mindSeal = false;
    alert(data.message);
    window.App = undefined;
    m.route('/landing');
  })
}

User.sync = function(){
  console.log("syncing")
  return m.request({
    method:'POST',
    url: '/sync',
    data: {time: moment().format(),mindSeal:App.mindSeal}
  }).then(function(data){
    console.log(data);
  })
}

User.getDecks = function(router){
  //for when a user is already logged in, but is refreshing the page.
  console.log("seems user is still logged in, trying to get decks");
  return m.request({
    method: 'GET',
    url: '/decks'
  }).then(function(data){
    if (data.login === true){
      window.App = {};
      App.mindSeal = data.mindSeal;
      console.log("get the newly minted mindSeal:",App.mindSeal)
      localStorage.mindSeal = true;
      router();
      if (m.route() === '/landing') m.route('/home');
    }
    else if (data.login === false){
      router();
      localStorage.mindSeal = false;
      alert(data.message);
      window.App = undefined;
      m.route('/landing');
    }
    console.log("data was: ", data); 
    return data;
  })
}
