window.User = {}

User.signUp = function(username, password) {
  console.log("trying to call server (signup) with u/p: " + username + " " + password);

  var protectedReg = /test|llama|asd|another|user|another|onemore|qwe|sidjasid|abc123|-q-|--q/;

  if (typeof ctrl.username() === "undefined"){
    alert("Please enter a username to signup with.");
  } 
  else if (protectedReg.exec(ctrl.username()) !== null && ctrl.password() !== "testq") {
    // this is a lie, but they are protected:
    alert("That username is taken, please try another."); 
  }
  else if (username.length > 14){
    alert("Please enter a username shorter than 14 characters.");
  }
  else if (typeof ctrl.password() === "undefined" || ctrl.password().length < 4){
    alert("Please enter a password of at least 4 characters to sign up with.");
  }
  else {
    return m.request({
      method: 'POST',
      url: '/signup',
      // config: xhrConfig,
      data: {username: username, password: password, time: moment().format()}
    })
    .then(function(data){
      if (data.login === true){
        localStorage.mindSeal = moment().format();
        console.log("set localStorage.mindSeal to:",localStorage.mindSeal)
        if (typeof window.App === "undefined") window.App = {};
        console.log("Got the newly minted mindSeal:", data.mindSeal);
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
}

User.login = function(username, password) {
  console.log("trying to call server (login) with u/p: " + username + " " + password)
  return m.request({
    method: 'POST',
    url: '/login',
    data: {username: username, password: password}
  })
  .then(function(data){
    if (data.login === true){
      localStorage.mindSeal = moment().format();
      console.log("set localStorage.mindSeal to:",localStorage.mindSeal)
      if (typeof window.App === "undefined") window.App = {};
      App.mindSeal = data.mindSeal;
      console.log("Got this mindSeal from the server:", App.mindSeal)
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
  if (typeof App === "undefined" || typeof App.mindSeal === "undefined" || App.mindSeal.userSettings === "undefined"){
    console.log("App.mindSeal.userSettings is undefined! Potential Major glitch! Overwriting with blank to prevent crash.")
    App.mindSeal.userSettings = {};
  }

  console.log("going to send:",App.mindSeal);
  return m.request({
    method:'POST',
    url: '/logout',
    data: {time: moment().format(),mindSeal:App.mindSeal}
  }).then(function(data){
    localStorage.mindSeal = false;
    console.log("set localStorage.mindSeal to:",localStorage.mindSeal)
    console.log("logout server response: ", data);
    console.log(data.message);
    window.App.mindSeal = {};
    m.route('/landing');
  })
}

User.sync = function(){
  console.log("syncing");
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
      console.log("user logged in");
      if (typeof App === "undefined") window.App = {};
      App.mindSeal = data.mindSeal;
      console.log("get the newly minted mindSeal:",App.mindSeal)
      localStorage.mindSeal = true;
      router();
      if (m.route() === '/landing') m.route('/home');
    }
    else if (data.login === false){
      console.log("cannot get decks, user does not have valid login cookie.");
      router();
      localStorage.mindSeal = false;
      console.log(data.message);
      window.App.mindSeal = undefined;
      window.App.userSettings = undefined;
      m.route('/landing');
    }
    console.log("data was: ", data); 
    return data;
  })
}
