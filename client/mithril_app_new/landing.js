(function(){
  console.log("declaring landing")
  window.Landing = {};

  Landing.view = function(ctrl){  
    return m(".cow",[
    m(".row", [
      m(".col.m5.offset-m3.l4.offset-l4.s12",[
        m("p", "Alpha release, under active development. ")
        ])
      ]),
      m(".cow.valign-wrapper", [
        m(".row", [
          m(".hoverable.card-panel.col.m5.offset-m1.l4.offset-l2.s12.top-bottom-pad-mar.valign-wrapper", {config:ctrl.animate}, [
            m("form.col.s12", [
              m(".container.card-content", [
                m('p','Sign Up or Login using this form.'),
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
                    m("input.validate[id='email'][type='email']", {/*placeholder: "Enter an email if signing up", */onchange: m.withAttr("value", ctrl.email)}),
                    m("label[for='email']", "Email (if signing up)")
                  ])
                ]),
                m("a.col.s4.waves-effect.waves-light.btn-large", {onclick:ctrl.signUp}, [m("i.material-icons.right", "person_add"),"Sign Up"]),
                m("a.col.s4.waves-effect.waves-light.btn-large", {onclick:ctrl.login}, [m("i.material-icons.right", "person"),"Login"])
              ])
            ])
          ]),
          window.innerWidth < 600 ? 
          null
          :
          m(".card-panel.col.s12.m5.l4.top-bottom-pad-mar.valign-wrapper", {config:ctrl.animate}, [
            m(".col.s12", [
              m(".container.card-content", [
                m("h5", [" What is ",m("i", "mind:seal"),"? "]),
                m("p.home-text", "mind:seal is a spaced repitition flashcard app designed to be as simple, fast, and clean as possible. It uses a machine learning algorithm to determine when you should see facts, and adapts to your personal usage patterns over time, for each individual card. Join to see shared decks, or create your own!")
              ])
            ])
          ])
        ])
      ])//
    ])
  };

  Landing.controller = function(args){
    ctrl = this;

    ctrl.username = m.prop();
    ctrl.password = m.prop();
    ctrl.email    = m.prop()

    ctrl.animate = function(elem,init,num){
      if (!init) $(elem).velocity("transition.flipYIn"/*, {delay:num*100}*/)
      // $('#'+deckName).velocity("transition.flipYIn", {delay:200})
    }
    
    ctrl.signUp   = function(){
      if (typeof ctrl.username() === "undefined"){
        alert("Please enter a username to signup with.")
      } 
      else if (typeof ctrl.password() === "undefined" || ctrl.password().length < 4){
        alert("Please enter a password of at least 4 characters to sign up with.")
      }
      else {
        User.signUp(ctrl.username(), ctrl.password(), ctrl.email())
      }
    }
    
    ctrl.login    = function(){
      User.login(ctrl.username(), ctrl.password())
    }

    ctrl.forgot   = function(){
      //User.forgot(ctrl.email())
    }

  };
})()
