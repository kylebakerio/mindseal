//commented out extension functionality until chrome storage implemented
// m.mount(document.getElementById('createCard'), addCards)
// m.mount(document.getElementById('decks'), Home)

document.addEventListener('DOMContentLoaded', function() {
  var login = document.getElementById('login');
  login.addEventListener('click', function() {
    getToken();
  });
});