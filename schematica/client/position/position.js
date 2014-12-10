Template.position.rendered = function(){
  $('.modal').draggable({
      handle: '.modal-header',
      stop: function(evt, ui){
          var left = ui.position.left;
          var top = ui.position.top;
          Positions.update($(this).attr('id'), {$set:{left: left+'px', top:top+'px'}});
      }
  });
};

Template.position.events({
    'click .icon-tasks': function(evt, tmpl){
        evt.stopPropagation();
        evt.preventDefault();
        Session.set('editing_tablename', this._id);
    },
    'click .addfield':function(evt, tmpl){
        evt.stopPropagation();
        evt.preventDefault();
        DBfields.insert({name:"New Field", tableid: this._id});
    },
    'keyup .tablename': function(evt, tmpl){
        evt.stopPropagation();
        evt.preventDefault();
        if(evt.which === 13){
            Positions.update(this._id, {$set:{name:tmpl.find('.tablename').value}});
            Session.set('editing_tablename', null);
        }
    }
});

Template.position.helpers({
    editing_tablename: function(){
       return Session.equals('editing_tablename', this._id);
    },
    dbfields: function(){
        return DBfields.find();
    }
});
