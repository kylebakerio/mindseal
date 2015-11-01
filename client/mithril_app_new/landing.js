(function(){
  window.Landing = {};

  Landing.view = function(ctrl){  
    return m(".cow.valign-wrapper", [
      m(".row", [
        m(".hoverable.card-panel.col.m5.offset-m1.l4.offset-l2.s12.top-bottom-pad-mar.valign-wrapper", [
          m("form.col.s12", [
            m(".container.card-content", [
              m(".row", [
                m(".input-field.col.s12", [
                  m("input.validate[id='username'][type='text']", {onchange: m.withAttr("value", ctrl.username)}),
                  m("label[for='username']", "Username")
                ])
              ]),
              m(".row", [
                m(".input-field.col.s12", [
                  m("input.validate[id='password'][type='password']", {onchange: m.withAttr("value", ctrl.password)}),
                  m("label[for='password']", "Password")
                ])
              ]),
              m(".row", [
                m(".input-field.col.s12", [
                  m("input.validate[id='email'][type='email']", {onchange: m.withAttr("value", ctrl.email)}),
                  m("label[for='email']", "Email")
                ])
              ]),
              m("a.col.s4.waves-effect.waves-light.btn-large", {onclick:ctrl.signUp}, [m("i.material-icons.right", "cloud"),"Sign Up"]),
              m("a.col.s4.waves-effect.waves-light.btn-large", {onclick:ctrl.login}, [m("i.material-icons.right", "cloud"),"Login"])
            ])
          ])
        ]),
        window.innerWidth < 600 ?
        null
        :
        m(".card-panel.col.s12.m5.l4.top-bottom-pad-mar.valign-wrapper", [
          m(".col.s12", [
            m(".container.card-content", [
              m("h5", [" What is ",m("i", "mind:seal"),"? "]),
              m("p.home-text", "mind:seal is a spaced repition flashcard app designed to be as simple, fast, and clean as possible. It uses a machine learning algorithm to determine when you should see facts, and adapts to your personal usage patterns over time, for each individual card. Join to see shared decks, or create your own!")
            ])
          ])
        ])

      ])
    ])
  };

  Landing.controller = function(args){
    ctrl = this;

    ctrl.username = m.prop();
    ctrl.password = m.prop();
    ctrl.email    = m.prop()
    
    ctrl.signUp   = function(){
      User.signUp(ctrl.username(), ctrl.password(), ctrl.email())
    }
    
    ctrl.login    = function(){
      User.login(ctrl.username(), ctrl.password())
    }

    ctrl.forgot   = function(){
      //User.forgot(ctrl.email())
    }

    if (/*logged in*/typeof App === 'object' && typeof App.mindSeal === 'object') {
      console.log("App.mindSeal is an object")
      m.route("/home");
    }
  };
})()
