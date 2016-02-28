console.log("declaring animate");
if (typeof App === "undefined") {
  window.App = {};
}

App.animate = function(elem,init,num,enEx){
  console.log("called animation")
  //elem is the element itself, init is whether this elem has already been initialized,
  //num is what index the item being transitioned is in its list, enEx is for enter/exit,
  //and tells us whether we're animating away or towards us.
  if (!init) $(elem).velocity("transition.flipYIn", {delay:num*100})
  else if (enEx === "ex") {
    $(elem).velocity("transition.flipYOut", { delay:num*100, complete:function(){m.endComputation()} }  )
  }
}
