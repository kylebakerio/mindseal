Card = Card || {};

Card.vm = function (props) {
  // ViewModel for editing cards 
  props = props || {};
  // if passed in, props should include .front, .back, .id and .flag properties

  return {  
    front: m.prop(props.front || ''),
    back:  m.prop(props.back || ''),
    id:    m.prop(props.id || 0),
    flag:  m.prop(props.flag || '')
  }
}


// these functions need to be redefined, but we should save these
//implementations for reference.

  // remove = function(index) {
  //   var toRemove = ctrl.contacts().splice(index, 1);
  //   m.request({
  //     method: 'DELETE',
  //     url: '/decks/' + options.deck,
  //     data: toRemove
  //   });
  // }

  // update = function(index) {
  //   var toUpdate = ctrl.contacts()[index];
  //   m.request({
  //     method: 'POST',
  //     url: '/decks/' + options.deck,
  //     data: toUpdate
  //   })
  //   .then(function(updatedCard) {
  //     ctrl.cards()[index] = updatedCard;
  //   })
  // }