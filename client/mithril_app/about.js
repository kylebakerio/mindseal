var about = {};

about.view = function(){

  return m("div.container center-block",[
    m('img',{src:'http://www.liveanimalslist.com/mammals/images/ringed-seal.jpg'}),
    m('br'),
    m("h1", "Mindseal"),
    m("br"),
    m("p", "This is an app for seal the memory leaks of your mind. All of us forget\
      things constantly, at an alarming rate; use technology to catch things just\
      before the escape from your memory."), //should modify default tval
    m("br"),
    m("p", "Upcoming features:"), //should modify default cScale
    m("br"),
    m("p", "desktop application, stats and visualizations, \
    mobile apps (android and iOS), hotkeys, open source, \
      syncing with anki, export to and import from anki (including shared decks)\
      , Chrome extension, prettier visualizations, and much more!"), //should enable cScale modifiers (advanced algo)
    m("br")//,
    // m("br"),
    // m("h1", "Deck about:"),
    // m("", mArray), 
  ]);
}

about.controller = function(){

}
