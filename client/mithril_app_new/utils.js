console.log("declaring animate");
if (typeof App === "undefined") {
  window.App = {};
};

App.animate = function(elem,init,num,enEx){
  // a function to toggle element animations. flips them in, staggered if not initialized
  // flips out otherwise. (?)

  // elem is the element itself, init is whether this elem has already been initialized,
  // num is what index the item being transitioned is in its list, enEx is either 'enter' or 'exit',
  // and tells us whether we're animating away or towards us.

  if (!init) {
    $(elem).velocity("transition.flipYIn", {delay:num*100});
  }
  else if (enEx === "ex") {
    $(elem).velocity("transition.flipYOut", { delay:num*100, complete: function(){m.endComputation();} });
  }
  else {
    console.log("fixme? superfluous animation of", elem, 'with:', init, num, enEx);
  }
};
