window.User = {}

//if(???) localStorage.loggedOut = true;

User.signUp = function(username, password) {
// localStorage.loggedIn = true; //when? should be much better way to handle w/sessions.
  //Uncaught ReferenceError: Deck is not defined App.js 53. temp fix below, untill correct data in db
  //step1: A GET request to make sure the client and server are synched up

  // var xhrConfig = function(xhr) {
  //   // getToken(function(token){
      
  //   //   xhr.setRequestHeader("api-token", token); //test user is 'mvp_tester', if bypassing auth
  //   // })
  // }
    // var session = 
    console.log("trying to call server (signup) with u/p: " + username + " " + password)
      return m.request({
        method: 'POST',
        url: '/signup',
        // config: xhrConfig,
        data: {username: username, password: password, time: moment().format()}
      })
      .then(function(data){
        console.log("data recieved from server below: ");
        if (data.message === "success"){
          App.mindSeal = data.mindSeal;
          setMindSeal();
          // localStorage.setObject('mindSeal', data.mindSeal)
          localStorage.loggedIn = true; //not good, should check session.
        }
        else if (data.message === "failed"){
          console.log("signup failed")
        }
        console.log("data was: ", data); 
        return data;
      })
/*      .catch(function(err){
        console.log("error: ", err);
      });*/

    // var sendData = {'userid': 'mvp_test', 'decks': localStorage.getObject('mindSeal').decks};

    // m.request({
    //   method: 'POST',
    //   url: '/refresh',
    //   data: sendData
    // })
    // .then(function(response){
    //   console.log("server post response below:");
    //   console.log(response);
    // })
    // return session;
  // }
}

User.login = function(username, password) {
  console.log("trying to call server (login) with u/p: " + username + " " + password)

  return m.request({
    method: 'POST',
    url: '/login',
    data: {username: username, password: password}
  }).then(function(data){
      if (data.login === true){
        console.log(data.message);
        App.mindSeal = data.mindSeal;
        setMindSeal();
        // localStorage.setObject('mindSeal', data.mindSeal)
        console.log("get the newly minted mindSeal:",localStorage.getObject('mindSeal'))
        // localStorage.loggedIn = true;
      }
      else if (data.login === "failed"){
        alert(data.message);
      }
      console.log("data was: ", data); 
      return data;
  })/*.catch(function(err){
    console.log("error: ", err);
  });*/
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
    alert(data.message);
    App.mindSeal = {};
    localStorage.setObject('mindSeal', {});
  })
}




