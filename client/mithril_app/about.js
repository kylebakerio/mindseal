var about = {};

about.view = function(){

  return m("div.container center-block",[
    m('br'),
    m("h1", "Mindseal"),
    m("p", "We should have a logo here."), //should modify some variable used by
    m("br"),
    m("p", "We should talk about spaced repitition here."), //should modify default tval
    m("br"),
    m("p", "Future coming features here."), //should modify default cScale
    m("br"),
    m("p", "desktop application, stats and visualizations, \
    mobile apps (android and iOS, hotkeys, open source, \
      syncing with anki, export to and import from anki (including shared decks)\
      and much more!"), //should enable cScale modifiers (advanced algo)
    m("br")//,
    // m("br"),
    // m("h1", "Deck about:"),
    // m("", mArray), 
  ]);
}

about.controller = function(){

}
